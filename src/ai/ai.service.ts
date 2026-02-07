import {
  Inject,
  Injectable,
  NotFoundException,
  Logger,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { SlotsService } from '../slots/slots.service.js';
import { BookingService } from '../booking/booking.service.js';
import { RequestUser } from '../common/interfaces/jwt-payload.interface.js';
import { AiQueryDto } from './dto/ai.dto.js';
import { AI_TOOLS, toOpenAiTools } from './ai-tools.js';
import { EventsGateway } from '../events/events.gateway.js';

/**
 * AI Assistant Service — LLM-powered Orchestrator with Tool Calling
 *
 * Architecture:
 * 1. User message comes in
 * 2. If LLM is configured (AI_API_KEY), send to OpenAI with tool definitions
 * 3. If LLM invokes a tool, execute it and return results to LLM for summarization
 * 4. If no LLM, fall back to rule-based intent detection
 */
@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly aiProvider: string;
  private readonly aiApiKey: string | undefined;
  private readonly aiModel: string;
  private readonly aiBaseUrl: string;
  private readonly aiTestMode: boolean;

  constructor(
    private readonly prisma: PrismaService,
    @Inject(ConfigService) private readonly configService: ConfigService,
    private readonly slotsService: SlotsService,
    private readonly bookingService: BookingService,
    private readonly eventsGateway: EventsGateway,
  ) {
    this.aiProvider = this.configService.get<string>(
      'AI_PROVIDER',
      'rule-based',
    );
    this.aiApiKey = this.configService.get<string>('AI_API_KEY');
    this.aiModel = this.configService.get<string>(
      'AI_MODEL',
      'openai/gpt-oss-120b:free',
    );
    this.aiBaseUrl = this.configService.get<string>(
      'AI_BASE_URL',
      'https://openrouter.ai/api/v1',
    );
    this.aiTestMode =
      this.configService.get<string>('AI_TEST_MODE', 'false') === 'true';

    this.logger.log(
      `AI config → provider=${this.aiProvider} model=${this.aiModel} testMode=${this.aiTestMode}`,
    );
  }

  async createSession(user: RequestUser) {
    return this.prisma.aiSession.create({
      data: { userId: user.id },
    });
  }

  async query(dto: AiQueryDto, user: RequestUser) {
    // Verify session belongs to user
    const session = await this.prisma.aiSession.findUnique({
      where: { id: dto.sessionId },
    });
    if (!session) throw new NotFoundException('AI session not found');
    if (session.userId !== user.id) {
      throw new ForbiddenException('Session does not belong to user');
    }

    // Save user message
    await this.prisma.aiMessage.create({
      data: {
        sessionId: dto.sessionId,
        role: 'USER',
        content: dto.message,
      },
    });

    // Get conversation history for context
    const history = await this.prisma.aiMessage.findMany({
      where: { sessionId: dto.sessionId },
      orderBy: { timestamp: 'asc' },
      take: 20, // Last 20 messages for context window
    });

    // Process via LLM or rule-based fallback
    let response: string;
    if (
      this.aiApiKey &&
      this.aiApiKey !== 'your-openai-api-key' &&
      process.env.NODE_ENV !== 'test'
    ) {
      response = await this.processWithLlm(history, dto.message, user);
    } else {
      response = await this.processWithRules(dto.message, user);
    }

    // Save assistant response
    await this.prisma.aiMessage.create({
      data: {
        sessionId: dto.sessionId,
        role: 'ASSISTANT',
        content: response,
      },
    });

    return {
      sessionId: dto.sessionId,
      response,
    };
  }

  async getHistory(sessionId: string, user: RequestUser) {
    const session = await this.prisma.aiSession.findUnique({
      where: { id: sessionId },
    });
    if (!session) throw new NotFoundException('AI session not found');
    if (session.userId !== user.id) {
      throw new ForbiddenException('Session does not belong to user');
    }

    return this.prisma.aiMessage.findMany({
      where: { sessionId },
      orderBy: { timestamp: 'asc' },
    });
  }

  // ─── LLM-based Processing ────────────────────────────────────────────────

  private async processWithLlm(
    history: Array<{ role: string; content: string }>,
    message: string,
    user: RequestUser,
  ): Promise<string> {
    try {
      const systemPrompt = this.buildSystemPrompt(user);
      const messages = [
        { role: 'system', content: systemPrompt },
        ...history.map((m) => ({
          role: m.role.toLowerCase() === 'user' ? 'user' : 'assistant',
          content: m.content,
        })),
      ];

      // Call LLM API (OpenAI-compatible: supports OpenAI, OpenRouter, etc.)
      this.logger.log(
        `[AI CALL] model=${this.aiModel} promptMessages=${messages.length} promptChars=${JSON.stringify(messages).length}`,
      );

      const response = await fetch(`${this.aiBaseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.aiApiKey}`,
          // OpenRouter-specific headers (ignored by OpenAI)
          'HTTP-Referer': 'https://portflow.ai',
          'X-Title': 'PORTFLOW AI',
        },
        body: JSON.stringify({
          model: this.aiModel,
          messages,
          tools: toOpenAiTools(),
          tool_choice: 'auto',
          temperature: 0.7,
          max_tokens: 1024,
          provider: { data_collection: 'allow' },
        }),
      });

      this.logger.log(`[AI RESPONSE] status=${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(
          `[AI PROVIDER ERROR] ${this.aiProvider} ${response.status}: ${errorText}`,
        );
        this.logger.warn(
          '[AI FALLBACK USED] Switching to rule-based due to provider error',
        );
        return this.processWithRules(message, user);
      }

      const data = await response.json();
      const choice = data.choices?.[0];

      if (!choice) {
        this.logger.warn(
          '[AI FALLBACK USED] No choices returned from provider',
        );
        return this.processWithRules(message, user);
      }

      // Handle tool calls
      if (choice.message?.tool_calls?.length > 0) {
        this.logger.log('[AI REAL RESPONSE] Tool calls received, executing...');
        return await this.handleToolCalls(choice.message, messages, user);
      }

      // Direct text response
      this.logger.log('[AI REAL RESPONSE] Direct text response received');
      return (
        choice.message?.content ||
        'I apologize, I could not process that request.'
      );
    } catch (error) {
      this.logger.error(
        `[AI PROVIDER ERROR] LLM processing exception: ${error}`,
      );
      this.logger.warn(
        '[AI FALLBACK USED] Switching to rule-based due to exception',
      );
      return this.processWithRules(message, user);
    }
  }

  private async handleToolCalls(
    assistantMessage: any,
    messages: any[],
    user: RequestUser,
  ): Promise<string> {
    const toolResults: any[] = [];

    for (const toolCall of assistantMessage.tool_calls) {
      const functionName = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments || '{}');

      this.logger.log(`AI tool call: ${functionName}(${JSON.stringify(args)})`);

      let result: any;
      try {
        result = await this.executeTool(functionName, args, user);
      } catch (error: any) {
        result = { error: error.message || 'Tool execution failed' };
      }

      toolResults.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      });

      // Save tool call as a message for audit
      await this.prisma.aiMessage
        .create({
          data: {
            sessionId: messages[1]?.sessionId || '',
            role: 'TOOL',
            content: JSON.stringify({
              tool: functionName,
              args,
              result:
                typeof result === 'string'
                  ? result
                  : JSON.stringify(result).slice(0, 500),
            }),
          },
        })
        .catch(() => {
          /* non-critical */
        });
    }

    // Send tool results back to LLM for natural language summary
    try {
      const followUp = await fetch(`${this.aiBaseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.aiApiKey}`,
          'HTTP-Referer': 'https://portflow.ai',
          'X-Title': 'PORTFLOW AI',
        },
        body: JSON.stringify({
          model: this.aiModel,
          messages: [...messages, assistantMessage, ...toolResults],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      if (followUp.ok) {
        const followUpData = await followUp.json();
        return (
          followUpData.choices?.[0]?.message?.content ||
          'Here are your results.'
        );
      }
    } catch (error) {
      this.logger.error(`LLM follow-up error: ${error}`);
    }

    // If LLM follow-up fails, format tool results directly
    return toolResults
      .map((r) => {
        const parsed = JSON.parse(r.content);
        return typeof parsed === 'string'
          ? parsed
          : JSON.stringify(parsed, null, 2);
      })
      .join('\n\n');
  }

  // ─── Tool Execution Engine ───────────────────────────────────────────────

  private async executeTool(
    name: string,
    args: Record<string, any>,
    user: RequestUser,
  ): Promise<any> {
    switch (name) {
      case 'check_availability':
        return this.toolCheckAvailability(args.terminalId, args.date);

      case 'get_my_bookings':
        return this.toolGetMyBookings(user);

      case 'get_port_status':
        return this.toolGetPortStatus();

      case 'get_heatmap':
        return this.toolGetHeatmap(args.terminalId);

      case 'track_container':
        return this.toolTrackContainer(args.containerNumber);

      case 'create_booking':
        return this.toolCreateBooking(
          args as {
            terminalId: string;
            timeSlotId: string;
            truckId?: string;
            containerId?: string;
          },
          user,
        );

      case 'cancel_booking':
        return this.toolCancelBooking(args.bookingId, user);

      default:
        return { error: `Unknown tool: ${name}` };
    }
  }

  private async toolCheckAvailability(terminalId?: string, date?: string) {
    const availability = await this.slotsService.getAvailability(
      terminalId,
      date,
    );
    return {
      slots: availability.slice(0, 10).map((s) => ({
        id: s.id,
        terminal: s.terminalName,
        start: s.startTime,
        end: s.endTime,
        available: s.available,
        capacity: s.capacity,
      })),
      total: availability.length,
    };
  }

  private async toolGetMyBookings(user: RequestUser) {
    const bookings = await this.bookingService.findMyBookings(user.id);
    return bookings.map((b) => ({
      id: b.id,
      terminal: b.terminal.name,
      status: b.status,
      startTime: b.timeSlot.startTime,
      endTime: b.timeSlot.endTime,
    }));
  }

  private async toolGetPortStatus() {
    const now = new Date();
    const terminals = await this.prisma.terminal.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: {
            bookings: {
              where: { status: { in: ['PENDING', 'CONFIRMED'] } },
            },
          },
        },
      },
    });

    return terminals.map((t) => ({
      name: t.name,
      location: t.location,
      activeBookings: t._count.bookings,
    }));
  }

  private async toolGetHeatmap(terminalId?: string) {
    return this.slotsService.getHeatmap(terminalId);
  }

  private async toolTrackContainer(containerNumber: string) {
    const container = await this.prisma.container.findUnique({
      where: { containerNumber },
      include: {
        trackingEvents: {
          orderBy: { timestamp: 'desc' },
          take: 10,
        },
      },
    });

    if (!container) {
      return { error: `Container ${containerNumber} not found` };
    }

    return {
      containerNumber: container.containerNumber,
      events: container.trackingEvents.map((e) => ({
        type: e.type,
        location: e.location,
        timestamp: e.timestamp,
      })),
    };
  }

  private async toolCreateBooking(
    args: {
      terminalId: string;
      timeSlotId: string;
      truckId?: string;
      containerId?: string;
    },
    user: RequestUser,
  ) {
    if (user.role !== 'CARRIER') {
      return { error: 'Only carriers can create bookings' };
    }

    try {
      const booking = await this.bookingService.create(
        {
          terminalId: args.terminalId,
          timeSlotId: args.timeSlotId,
          truckId: args.truckId,
          containerId: args.containerId || '',
        },
        user,
      );
      return {
        id: booking.id,
        status: booking.status,
        message: 'Booking created successfully. Waiting for operator approval.',
      };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  private async toolCancelBooking(bookingId: string, user: RequestUser) {
    try {
      await this.bookingService.cancel(bookingId, user.id);
      return { message: `Booking ${bookingId} cancelled successfully.` };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  // ─── Rule-Based Fallback Engine ──────────────────────────────────────────

  private async processWithRules(
    message: string,
    user: RequestUser,
  ): Promise<string> {
    const lowerMsg = message.toLowerCase();

    try {
      // Intent: Check availability
      if (
        lowerMsg.includes('available') ||
        lowerMsg.includes('availability') ||
        lowerMsg.includes('slot') ||
        lowerMsg.includes('free')
      ) {
        return await this.handleAvailabilityQuery(lowerMsg);
      }

      // Intent: My bookings
      if (
        lowerMsg.includes('my booking') ||
        lowerMsg.includes('my reservation') ||
        lowerMsg.includes('my trips')
      ) {
        return await this.handleMyBookingsQuery(user);
      }

      // Intent: Create booking
      if (
        lowerMsg.includes('book') ||
        lowerMsg.includes('reserve') ||
        lowerMsg.includes('create booking')
      ) {
        return this.handleBookingIntent();
      }

      // Intent: Cancel booking
      if (lowerMsg.includes('cancel')) {
        return this.handleCancelIntent();
      }

      // Intent: Track container
      if (lowerMsg.includes('track') || lowerMsg.includes('container')) {
        const containerMatch = message.match(/[A-Z]{4}\d{7}/i);
        if (containerMatch) {
          return await this.handleContainerTrack(
            containerMatch[0].toUpperCase(),
          );
        }
        return 'Please provide a container number (e.g., MSKU1234567) to track.';
      }

      // Intent: Port status / pulse
      if (
        lowerMsg.includes('status') ||
        lowerMsg.includes('pulse') ||
        lowerMsg.includes('congestion') ||
        lowerMsg.includes('busy')
      ) {
        return await this.handleStatusQuery();
      }

      // Intent: Help
      if (lowerMsg.includes('help') || lowerMsg.includes('what can you')) {
        return this.handleHelpQuery(user);
      }

      // Default
      return (
        `I understand you're asking: "${message}".\n\n` +
        'I can help you with:\n' +
        '• **Slot availability** — "What slots are available tomorrow?"\n' +
        '• **My bookings** — "Show my bookings"\n' +
        '• **Port status** — "How busy is the port?"\n' +
        '• **Container tracking** — "Track container MSKU1234567"\n' +
        '• **Booking guidance** — "How do I book a slot?"\n\n' +
        'Type **help** for more options.'
      );
    } catch (error) {
      this.logger.error(`AI rule-based processing error: ${error}`);
      return 'I encountered an error processing your request. Please try again.';
    }
  }

  private async handleAvailabilityQuery(message: string): Promise<string> {
    const dateMatch = message.match(/(\d{4}-\d{2}-\d{2})/);
    const date = dateMatch?.[1] || undefined;

    // Try to extract "tomorrow"
    let resolvedDate = date;
    if (!resolvedDate && message.includes('tomorrow')) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      resolvedDate = tomorrow.toISOString().split('T')[0];
    }

    const availability = await this.slotsService.getAvailability(
      undefined,
      resolvedDate,
    );

    if (availability.length === 0) {
      return resolvedDate
        ? `No time slots found for ${resolvedDate}. Try checking another date.`
        : 'No upcoming time slots are currently available.';
    }

    const summary = availability.slice(0, 5).map((slot) => {
      const start = new Date(slot.startTime).toLocaleString();
      const end = new Date(slot.endTime).toLocaleString();
      return `• **${slot.terminalName}**: ${start} - ${end} | ${slot.available}/${slot.capacity} spots`;
    });

    return (
      `Here are the available slots${resolvedDate ? ` for ${resolvedDate}` : ''}:\n\n` +
      summary.join('\n') +
      (availability.length > 5
        ? `\n\n...and ${availability.length - 5} more slots available.`
        : '') +
      '\n\nWould you like to book one of these slots?'
    );
  }

  private async handleMyBookingsQuery(user: RequestUser): Promise<string> {
    const bookings = await this.bookingService.findMyBookings(user.id);

    if (bookings.length === 0) {
      return "You don't have any bookings yet. Would you like to create one? Ask me about available slots!";
    }

    const summary = bookings.slice(0, 5).map((b) => {
      const status =
        b.status === 'CONFIRMED'
          ? '✅ Confirmed'
          : b.status === 'PENDING'
            ? '⏳ Pending'
            : b.status === 'CONSUMED'
              ? '🏁 Used'
              : b.status === 'CANCELLED'
                ? '❌ Cancelled'
                : `📋 ${b.status}`;
      return `• **${b.terminal.name}** | ${status} | ${new Date(b.timeSlot.startTime).toLocaleString()} — ID: \`${b.id.slice(0, 8)}...\``;
    });

    return `Your recent bookings:\n\n${summary.join('\n')}`;
  }

  private handleBookingIntent(): string {
    return (
      'To create a booking, here is what you need:\n\n' +
      '1. **Check available slots** — Ask "What slots are available?"\n' +
      '2. **Choose a terminal and time slot** from the list\n' +
      '3. **Create the booking** via `POST /bookings` with the terminal ID and time slot ID\n\n' +
      'Alternatively, tell me the terminal and date you want, and I can help you find the best slot!'
    );
  }

  private handleCancelIntent(): string {
    return (
      'To cancel a booking:\n\n' +
      '1. Ask me "Show my bookings" to find the booking ID\n' +
      '2. Use `POST /bookings/{id}/cancel` to cancel it\n\n' +
      'Note: Only **PENDING** or **CONFIRMED** bookings can be cancelled.'
    );
  }

  private async handleContainerTrack(containerNumber: string): Promise<string> {
    try {
      const container = await this.prisma.container.findUnique({
        where: { containerNumber },
        include: {
          trackingEvents: {
            orderBy: { timestamp: 'desc' },
            take: 5,
          },
        },
      });

      if (!container) {
        return `Container **${containerNumber}** not found. Please check the number and try again.`;
      }

      if (container.trackingEvents.length === 0) {
        return `Container **${containerNumber}** found, but no tracking events are recorded yet.`;
      }

      const events = container.trackingEvents.map((e) => {
        return `• **${e.type}** — ${e.location} — ${new Date(e.timestamp).toLocaleString()}`;
      });

      return `Tracking for container **${containerNumber}**:\n\n${events.join('\n')}`;
    } catch {
      return `Error tracking container ${containerNumber}. Please try again.`;
    }
  }

  private async handleStatusQuery(): Promise<string> {
    const now = new Date();
    const terminals = await this.prisma.terminal.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: {
            bookings: {
              where: {
                status: { in: ['PENDING', 'CONFIRMED'] },
                timeSlot: {
                  startTime: { gte: now },
                },
              },
            },
          },
        },
      },
    });

    if (terminals.length === 0) {
      return 'No active terminals found.';
    }

    const lines = terminals.map((t) => {
      const level =
        t._count.bookings > 15
          ? '🔴 High'
          : t._count.bookings > 8
            ? '🟡 Medium'
            : '🟢 Low';
      return `• **${t.name}** — ${t._count.bookings} active bookings — Congestion: ${level}`;
    });

    return `Current port status:\n\n${lines.join('\n')}\n\nWant to see slot availability for a specific terminal?`;
  }

  private handleHelpQuery(user: RequestUser): string {
    const baseHelp =
      "I'm your **PORTFLOW AI** assistant. Here's what I can do:\n\n" +
      '📋 **"What slots are available?"** — Check time slot availability\n' +
      '📊 **"What is the port status?"** — Current congestion levels\n' +
      '📦 **"Track container MSKU1234567"** — Container tracking\n';

    if (user.role === 'CARRIER') {
      return (
        baseHelp +
        '🚛 **"Show my bookings"** — View your booking history\n' +
        '📝 **"How do I book?"** — Booking instructions\n' +
        '❌ **"How do I cancel?"** — Cancellation instructions\n'
      );
    }

    if (user.role === 'TERMINAL_OPERATOR') {
      return (
        baseHelp +
        '📋 **"Show the queue"** — View pending bookings\n' +
        '⚠️ **"Any alerts?"** — Check current alerts\n'
      );
    }

    return baseHelp + '🔍 Ask me anything about port operations!';
  }

  private buildSystemPrompt(user: RequestUser): string {
    return (
      'You are PORTFLOW AI, an intelligent assistant for a maritime port truck booking system.\n' +
      'You help users manage truck bookings, check slot availability, track containers, and understand port congestion.\n\n' +
      `Current user: ${user.email} (Role: ${user.role})\n\n` +
      'RULES:\n' +
      '- Be concise and professional\n' +
      '- Use the provided tools to fetch real data — NEVER make up data\n' +
      '- For carriers: help with bookings, availability, and container tracking\n' +
      '- For operators: help with queue management and alerts\n' +
      '- For admins: help with analytics and configuration\n' +
      '- Always format dates in a human-readable way\n' +
      '- If you cannot help with something, explain what you CAN help with\n' +
      `- Only carriers (role=CARRIER) can create or cancel bookings. This user's role is ${user.role}.\n`
    );
  }

  // ─── Test: AI Conversational Chat ─────────────────────────────────────────

  /**
   * Full mock context covering ALL intent categories:
   *   Carrier: slots, bookings, containers, readiness, gate access, proofs, rescheduling
   *   Operator: pending containers, congestion, priorities, alerts, status updates
   *   Gate Agent: gate validation, denials, entry estimates
   *   Admin: KPIs, delays, AI impact, audit trail, blockchain proofs
   */
  private readonly MOCK_CONTEXT = {
    // ── Carrier: Slots & Bookings ────────────────────────────────────────────
    availableSlots: [
      {
        terminal: 'Terminal A',
        date: '2026-02-07',
        start: '08:00',
        end: '09:00',
        congestion: 'high',
        score: 0.45,
      },
      {
        terminal: 'Terminal A',
        date: '2026-02-07',
        start: '09:30',
        end: '10:30',
        congestion: 'low',
        score: 0.87,
      },
      {
        terminal: 'Terminal A',
        date: '2026-02-07',
        start: '11:00',
        end: '12:00',
        congestion: 'medium',
        score: 0.65,
      },
      {
        terminal: 'Terminal B',
        date: '2026-02-07',
        start: '14:00',
        end: '15:00',
        congestion: 'low',
        score: 0.92,
      },
    ],
    myBookings: [
      {
        bookingId: 'BK-001',
        terminal: 'Terminal A',
        date: '2026-02-06',
        slot: '10:00-11:00',
        status: 'AT_RISK',
        truckPlate: 'AB-123-CD',
        containerNumber: 'MSCU1234567',
        riskReason: 'Container not confirmed',
        recommendedAction: 'Reschedule slot',
      },
      {
        bookingId: 'BK-002',
        terminal: 'Terminal B',
        date: '2026-02-07',
        slot: '14:00-15:00',
        status: 'CONFIRMED',
        truckPlate: 'EF-456-GH',
        containerNumber: 'TCLU7654321',
        riskReason: null,
        recommendedAction: null,
      },
      {
        bookingId: 'BK-003',
        terminal: 'Terminal A',
        date: '2026-02-06',
        slot: '14:00-15:00',
        status: 'CANCELLED',
        truckPlate: 'AB-123-CD',
        containerNumber: 'HLXU3344556',
        riskReason: null,
        recommendedAction: null,
      },
    ],

    // ── Carrier: Container & Readiness ───────────────────────────────────────
    containers: [
      {
        containerId: 'MSCU1234567',
        status: 'IN_YARD',
        location: 'Terminal A - Yard 2',
        readiness: 'NOT_READY',
        eta: '2026-02-06T22:00:00',
        readinessProbability: 0.35,
        readinessBlockers: [
          'Customs clearance pending',
          'Inspection scheduled',
        ],
      },
      {
        containerId: 'TCLU7654321',
        status: 'READY',
        location: 'Terminal B - Gate Staging',
        readiness: 'READY',
        eta: null,
        readinessProbability: 1.0,
        readinessBlockers: [],
      },
      {
        containerId: 'HLXU3344556',
        status: 'NOT_ARRIVED',
        location: 'At sea - ETA vessel MAERSK VOYAGER',
        readiness: 'NOT_READY',
        eta: '2026-02-07T08:00:00',
        readinessProbability: 0.1,
        readinessBlockers: ['Vessel not docked', 'Discharge pending'],
      },
    ],

    // ── Carrier: Reschedule Options ──────────────────────────────────────────
    rescheduleOptions: [
      {
        slot: '14:00-15:00',
        terminal: 'Terminal A',
        date: '2026-02-07',
        readinessProbability: 0.82,
        reason: 'Container likely ready by afternoon',
      },
      {
        slot: '16:00-17:00',
        terminal: 'Terminal A',
        date: '2026-02-07',
        readinessProbability: 0.95,
        reason: 'High confidence — all clearances expected by then',
      },
    ],

    // ── Carrier: Gate Access & Proofs ────────────────────────────────────────
    gateAccess: {
      truckPlate: 'AB-123-CD',
      bookingId: 'BK-001',
      gateResult: 'DENIED',
      denialReason:
        'Container readiness not confirmed — missing customs clearance',
      suggestedAction: 'Wait for customs clearance or reschedule booking',
    },
    readinessProof: {
      bookingId: 'BK-002',
      containerId: 'TCLU7654321',
      proofHash: '0xabc123def456789abcdef0123456789abcdef0123456789abcdef01234',
      blockchain: 'Ethereum Sepolia',
      timestamp: '2026-02-06T10:30:00Z',
      status: 'VERIFIED',
      explanation:
        'This cryptographic proof confirms the container was marked READY at the recorded time. It is immutable and auditable.',
    },

    // ── Operator: Pending & Blocking Containers ──────────────────────────────
    pendingContainers: [
      {
        containerId: 'MSCU1234567',
        status: 'IN_YARD',
        location: 'Terminal A - Yard 2',
        blockedReason: 'Customs clearance pending',
        impactedBookings: ['BK-001'],
        severity: 'HIGH',
      },
      {
        containerId: 'HLXU3344556',
        status: 'NOT_ARRIVED',
        location: 'At sea',
        blockedReason: 'Vessel not docked',
        impactedBookings: ['BK-003'],
        severity: 'CRITICAL',
      },
      {
        containerId: 'MSCU9988776',
        status: 'IN_YARD',
        location: 'Terminal A - Yard 3',
        blockedReason: 'Damaged seal — inspection required',
        impactedBookings: [],
        severity: 'MEDIUM',
      },
    ],

    // ── Operator: Congestion & Priorities ────────────────────────────────────
    congestionForecast: {
      terminal: 'Terminal A',
      currentOccupancy: '78%',
      forecastNextHour: '92%',
      riskLevel: 'HIGH',
      peakWindow: '14:00-16:00',
      recommendation: 'Divert non-urgent trucks to Terminal B',
    },
    operationalPriorities: [
      {
        rank: 1,
        action: 'Unload MSCU1234567',
        reason: 'Blocking booking BK-001 — customer at risk',
        urgency: 'CRITICAL',
      },
      {
        rank: 2,
        action: 'Complete inspection for MSCU9988776',
        reason: 'Damaged seal — yard space occupied',
        urgency: 'HIGH',
      },
      {
        rank: 3,
        action: 'Prepare berth for MAERSK VOYAGER',
        reason: 'Vessel arriving 2026-02-07 08:00 with 3 expected containers',
        urgency: 'MEDIUM',
      },
    ],

    // ── Operator: Alerts ─────────────────────────────────────────────────────
    activeAlerts: [
      {
        alertId: 'ALT-001',
        type: 'CONGESTION',
        message: 'Terminal A approaching capacity (78%)',
        severity: 'WARNING',
        timestamp: '2026-02-06T13:00:00',
      },
      {
        alertId: 'ALT-002',
        type: 'READINESS_FAILURE',
        message: 'Container MSCU1234567 missed readiness deadline for BK-001',
        severity: 'CRITICAL',
        timestamp: '2026-02-06T09:45:00',
      },
      {
        alertId: 'ALT-003',
        type: 'GATE_DENIAL',
        message: 'Truck AB-123-CD denied at Gate A — 3rd attempt today',
        severity: 'HIGH',
        timestamp: '2026-02-06T11:30:00',
      },
    ],

    // ── Gate Agent: Validation & Estimates ────────────────────────────────────
    gateValidation: {
      truckPlate: 'EF-456-GH',
      qrValid: true,
      bookingId: 'BK-002',
      bookingStatus: 'CONFIRMED',
      containerReady: true,
      accessDecision: 'ALLOWED',
      explanation:
        'Booking confirmed, container ready, QR valid. Truck may enter.',
    },
    gateEntryEstimate: {
      truckPlate: 'AB-123-CD',
      currentStatus: 'DENIED',
      reason: 'Container MSCU1234567 not ready',
      estimatedReadyAt: '2026-02-06T16:00:00',
      suggestedSlot: '16:00-17:00',
      waitTime: 'approx. 3 hours',
    },

    // ── Admin: KPIs & Analytics ──────────────────────────────────────────────
    kpiSummary: {
      date: '2026-02-06',
      totalBookings: 47,
      completedOnTime: 38,
      delayed: 6,
      cancelled: 3,
      avgWaitTimeMinutes: 22,
      avgTurnaroundMinutes: 45,
      gateUtilization: '81%',
      aiAssistedDecisions: 29,
      readinessAccuracy: '94%',
    },
    delayAnalysis: {
      date: '2026-02-06',
      totalDelays: 6,
      topCauses: [
        { cause: 'Container not ready', count: 3, avgDelayMinutes: 35 },
        { cause: 'Customs hold', count: 2, avgDelayMinutes: 60 },
        { cause: 'Gate queue overflow', count: 1, avgDelayMinutes: 15 },
      ],
      worstTerminal: 'Terminal A',
      suggestion:
        'Pre-clear customs for morning bookings to reduce delays by ~40%',
    },
    aiImpact: {
      period: '2026-02-06',
      tripsAvoided: 8,
      reschedulesTriggered: 12,
      avgTimeSavedMinutes: 28,
      proactiveAlerts: 15,
      readinessPredictionAccuracy: '94%',
      summary:
        'AI prevented 8 unnecessary trips and saved an average of 28 minutes per booking through proactive rescheduling.',
    },

    // ── Admin: Audit & Blockchain ────────────────────────────────────────────
    auditTrail: {
      bookingId: 'BK-001',
      events: [
        {
          timestamp: '2026-02-06T08:00:00',
          action: 'BOOKING_CREATED',
          actor: 'carrier@acme.com',
          details: 'Slot 10:00-11:00 at Terminal A',
        },
        {
          timestamp: '2026-02-06T09:00:00',
          action: 'READINESS_CHECK_FAILED',
          actor: 'system',
          details: 'Container MSCU1234567 not ready — customs pending',
        },
        {
          timestamp: '2026-02-06T09:05:00',
          action: 'STATUS_CHANGED',
          actor: 'system',
          details: 'Booking moved to AT_RISK',
        },
        {
          timestamp: '2026-02-06T09:30:00',
          action: 'RESCHEDULE_SUGGESTED',
          actor: 'ai-engine',
          details:
            'AI recommended slot 16:00-17:00 (readiness probability 95%)',
        },
        {
          timestamp: '2026-02-06T11:30:00',
          action: 'GATE_DENIED',
          actor: 'gate-agent@port.com',
          details: 'Truck AB-123-CD denied — container not ready',
        },
      ],
    },
    blockchainVerification: {
      proofHash: '0xabc123def456789abcdef0123456789abcdef0123456789abcdef01234',
      valid: true,
      blockchain: 'Ethereum Sepolia',
      blockNumber: 18234567,
      timestamp: '2026-02-06T10:30:00Z',
      explanation:
        'The hash matches the on-chain record. This proof is immutable and confirms the readiness status was recorded at the stated time.',
    },

    // ── Carrier/Driver: Delay & ETA ─────────────────────────────────────────
    containerDelayAnalysis: {
      containerId: 'MSCU1234567',
      currentStatus: 'IN_YARD',
      delayReason: 'Customs clearance pending — documentation received late',
      delayResponsibility: 'Customs authority',
      delayStarted: '2026-02-06T06:00:00',
      estimatedResolution: '2026-02-06T16:00:00',
      impactedBookings: ['BK-001'],
    },
    containerEtaPrediction: {
      containerId: 'MSCU1234567',
      predictedReadyAt: '2026-02-06T16:30:00',
      confidence: 0.78,
      factors: [
        'Customs processing avg 4h',
        'Inspection queue: 2 containers ahead',
      ],
    },
    containerComparison: [
      {
        containerId: 'MSCU1234567',
        readinessProbability: 0.35,
        eta: '2026-02-06T16:30:00',
        status: 'NOT_READY',
        rank: 3,
      },
      {
        containerId: 'TCLU7654321',
        readinessProbability: 1.0,
        eta: null,
        status: 'READY',
        rank: 1,
      },
      {
        containerId: 'HLXU3344556',
        readinessProbability: 0.1,
        eta: '2026-02-07T08:00:00',
        status: 'NOT_READY',
        rank: 2,
      },
    ],

    // ── Carrier/Driver: Time & Cost Optimization ─────────────────────────────
    waitingTimeSimulation: {
      options: [
        {
          slot: '14:00-15:00',
          estimatedWaitMinutes: 12,
          congestion: 'low',
          recommendation: 'BEST OPTION',
        },
        {
          slot: '10:00-11:00',
          estimatedWaitMinutes: 45,
          congestion: 'high',
          recommendation: 'AVOID',
        },
        {
          slot: '16:00-17:00',
          estimatedWaitMinutes: 18,
          congestion: 'medium',
          recommendation: 'GOOD',
        },
      ],
      summary: 'The 14:00-15:00 slot minimizes waiting time at 12 minutes.',
    },
    costImpactEstimate: {
      bookingId: 'BK-001',
      currentDelayCostEUR: 120,
      idleTruckCostPerHour: 40,
      projectedTotalCostIfWait: 280,
      projectedTotalCostIfReschedule: 60,
      recommendation: 'Reschedule — saves approximately €220',
      breakdown: [
        { item: 'Truck idle time (3h)', cost: 120 },
        { item: 'Late delivery penalty', cost: 100 },
        { item: 'Port storage surcharge', cost: 60 },
      ],
    },

    // ── Carrier/Driver: Fleet Intelligence ───────────────────────────────────
    fleetOverview: {
      totalTrucks: 5,
      activeTrucks: 3,
      idleTrucks: 1,
      inTransitTrucks: 1,
      trucks: [
        {
          plate: 'AB-123-CD',
          status: 'AT_PORT',
          currentBooking: 'BK-001',
          risk: 'HIGH',
        },
        {
          plate: 'EF-456-GH',
          status: 'AT_PORT',
          currentBooking: 'BK-002',
          risk: 'NONE',
        },
        {
          plate: 'IJ-789-KL',
          status: 'IN_TRANSIT',
          currentBooking: null,
          risk: 'NONE',
        },
        {
          plate: 'MN-012-OP',
          status: 'IDLE',
          currentBooking: null,
          risk: 'NONE',
        },
        {
          plate: 'QR-345-ST',
          status: 'AT_PORT',
          currentBooking: 'BK-004',
          risk: 'MEDIUM',
        },
      ],
    },
    truckAssignment: {
      bookingId: 'BK-001',
      currentTruck: 'AB-123-CD',
      availableTrucks: ['MN-012-OP', 'IJ-789-KL'],
      constraints: [
        'Truck must have valid port pass',
        'Driver must be assigned',
      ],
      status: 'READY_TO_ASSIGN',
    },
    driverInstructions: {
      truckPlate: 'AB-123-CD',
      bookingId: 'BK-001',
      currentSituation: 'Gate access denied — container not ready',
      steps: [
        'Step 1: Drive to Waiting Zone C (follow blue signs)',
        'Step 2: Park in bay 14-18 (nearest available)',
        'Step 3: Wait for SMS notification (~3 hours estimated)',
        'Step 4: Return to Gate A when notified',
        'Step 5: Present QR code for re-entry',
      ],
      alternativeAction: 'Request reschedule to 16:00-17:00 slot via the app',
    },

    // ── Operator: Yard & Sequence ────────────────────────────────────────────
    yardStatus: {
      terminal: 'Terminal A',
      totalCapacity: 500,
      currentLoad: 390,
      occupancyPercent: '78%',
      overflowRisk: 'HIGH',
      predictedFullAt: '2026-02-06T17:00:00',
      hotZones: [
        { zone: 'Yard 2', occupancy: '92%', status: 'NEAR_FULL' },
        { zone: 'Yard 3', occupancy: '85%', status: 'HIGH' },
        { zone: 'Yard 1', occupancy: '58%', status: 'NORMAL' },
      ],
    },
    containerSequence: [
      {
        rank: 1,
        containerId: 'MSCU1234567',
        reason: 'Blocking booking BK-001 — highest downstream impact',
        impactScore: 9.2,
      },
      {
        rank: 2,
        containerId: 'HLXU3344556',
        reason: 'Vessel MAERSK VOYAGER discharge — berth needed',
        impactScore: 7.8,
      },
      {
        rank: 3,
        containerId: 'MSCU9988776',
        reason: 'Yard space recovery — damaged seal area',
        impactScore: 5.1,
      },
    ],
    terminalSimulation: {
      scenario: 'Crane 2 offline',
      normalCapacityTrucksPerHour: 24,
      reducedCapacityTrucksPerHour: 16,
      congestionIncrease: '+35%',
      estimatedQueueLength: 14,
      estimatedExtraWaitMinutes: 25,
      recommendation:
        'Redirect 40% of afternoon trucks to Terminal B to prevent queue overflow',
    },

    // ── Operator: Risk & Escalation ──────────────────────────────────────────
    dailyRiskAssessment: {
      date: '2026-02-06',
      overallRisk: 'HIGH',
      riskScore: 7.4,
      factors: [
        {
          factor: 'At-risk bookings',
          count: 4,
          severity: 'HIGH',
        },
        {
          factor: 'Pending customs clearances',
          count: 3,
          severity: 'MEDIUM',
        },
        {
          factor: 'Terminal near capacity',
          count: 1,
          severity: 'HIGH',
        },
      ],
      recommendation:
        'Prioritize customs follow-ups and consider capacity overflow plan',
    },
    escalation: {
      containerId: 'MSCU1234567',
      bookingId: 'BK-001',
      escalatedTo: ['port-admin@port.com', 'carrier@acme.com'],
      severity: 'CRITICAL',
      reason:
        'Container delay exceeds 6h threshold — booking at risk of cancellation',
      timestamp: '2026-02-06T12:00:00',
      status: 'ESCALATED',
    },

    // ── Gate Agent: Queue & Compliance ────────────────────────────────────────
    gateQueueStatus: {
      gate: 'Gate A',
      queueLength: 7,
      estimatedWaitMinutes: 22,
      trucksWaiting: [
        { plate: 'AB-123-CD', waitingSince: '2026-02-06T11:30:00' },
        { plate: 'UV-678-WX', waitingSince: '2026-02-06T11:45:00' },
        { plate: 'YZ-901-AB', waitingSince: '2026-02-06T12:00:00' },
      ],
      throughputPerHour: 18,
    },
    truckRedirect: {
      truckPlate: 'AB-123-CD',
      suggestedArea: 'Waiting Zone C',
      directions: 'Exit gate lane → Turn right → Follow blue signs → Bay 14-18',
      estimatedCallbackTime: '2026-02-06T16:00:00',
      reason: 'Container not ready — redirecting to avoid gate congestion',
    },
    overrideRequest: {
      truckPlate: 'AB-123-CD',
      requestedBy: 'gate-agent@port.com',
      reason: 'Emergency cargo — perishable goods at risk',
      overrideType: 'MANUAL_GATE_ACCESS',
      status: 'PENDING_APPROVAL',
      approvalRequired: 'port-admin@port.com',
      timestamp: '2026-02-06T12:15:00',
    },
    driverVerification: {
      driverId: 'DRV-20261234',
      name: 'Jean Dupont',
      licenseValid: true,
      portPassValid: true,
      assignedTruck: 'EF-456-GH',
      matchesBooking: true,
      bookingId: 'BK-002',
      verificationResult: 'AUTHORIZED',
      explanation:
        'Driver identity verified — license valid, port pass active, matches booking BK-002.',
    },

    // ── Admin: Strategy & Governance ─────────────────────────────────────────
    terminalComparison: {
      terminals: [
        {
          name: 'Terminal A',
          avgWaitMinutes: 28,
          throughputPerDay: 185,
          delayRate: '14%',
          gateUtilization: '81%',
          bottleneck: 'Customs clearance',
        },
        {
          name: 'Terminal B',
          avgWaitMinutes: 15,
          throughputPerDay: 142,
          delayRate: '6%',
          gateUtilization: '62%',
          bottleneck: 'None',
        },
      ],
      recommendation:
        'Terminal B has better performance; consider redistributing load from Terminal A.',
    },
    policyConfig: {
      currentPolicy: {
        atRiskThreshold: 0.5,
        maxGateDenials: 3,
        autoEscalateAfterHours: 6,
        readinessDeadlineHoursBeforeSlot: 2,
      },
      proposedChange: {
        field: 'atRiskThreshold',
        oldValue: 0.5,
        newValue: 0.6,
        impact:
          'Fewer bookings flagged as AT_RISK (~20% reduction), but higher risk of missed containers.',
      },
      status: 'PENDING_CONFIRMATION',
    },
    carrierBehaviorAnalysis: {
      carriers: [
        {
          carrier: 'Acme Logistics',
          totalBookings: 120,
          onTimeRate: '78%',
          cancelRate: '8%',
          avgDelayMinutes: 22,
          reliabilityScore: 72,
        },
        {
          carrier: 'FastFreight Inc',
          totalBookings: 95,
          onTimeRate: '91%',
          cancelRate: '3%',
          avgDelayMinutes: 8,
          reliabilityScore: 93,
        },
        {
          carrier: 'OceanWay',
          totalBookings: 60,
          onTimeRate: '65%',
          cancelRate: '15%',
          avgDelayMinutes: 38,
          reliabilityScore: 54,
        },
      ],
      recommendation:
        'Investigate OceanWay — lowest reliability (54). Consider priority access for FastFreight (93).',
    },

    // ── Admin: Legal & Audit ─────────────────────────────────────────────────
    incidentReport: {
      reportId: 'INC-2026-0042',
      type: 'GATE_DENIAL_INCIDENT',
      date: '2026-02-06',
      involvedParties: [
        { role: 'Carrier', entity: 'Acme Logistics', truck: 'AB-123-CD' },
        { role: 'Gate Agent', entity: 'gate-agent@port.com' },
      ],
      timeline: [
        '11:30 — Truck AB-123-CD arrived at Gate A',
        '11:31 — QR scanned — booking BK-001 found',
        '11:31 — Container MSCU1234567 NOT READY',
        '11:32 — Gate access DENIED',
        '11:35 — Truck redirected to Waiting Zone C',
      ],
      blockchainProof:
        '0xabc123def456789abcdef0123456789abcdef0123456789abcdef01234',
      status: 'GENERATED',
    },
    complianceExport: {
      exportId: 'EXP-2026-0206',
      dateRange: '2026-02-01 to 2026-02-06',
      totalRecords: 312,
      categories: [
        { category: 'Gate access logs', count: 145 },
        { category: 'Booking status changes', count: 98 },
        { category: 'AI decisions', count: 69 },
      ],
      format: 'CSV',
      status: 'READY_TO_DOWNLOAD',
      downloadUrl: '/admin/exports/EXP-2026-0206.csv',
    },

    // ── Meta / System Intelligence ───────────────────────────────────────────
    aiDecisionExplanation: {
      decision: 'RESCHEDULE_RECOMMENDED',
      bookingId: 'BK-001',
      reasoning: [
        'Container MSCU1234567 readiness probability is 35% (below 50% threshold)',
        'Customs clearance has avg processing time of 4 hours',
        'Slot 16:00-17:00 gives 95% readiness probability',
        'Historical data: 89% of similar rescheduled bookings succeeded',
      ],
      modelConfidence: 0.91,
      alternativesConsidered: [
        { option: 'Wait', successProbability: 0.35 },
        { option: 'Reschedule to 14:00', successProbability: 0.82 },
        { option: 'Reschedule to 16:00', successProbability: 0.95 },
      ],
    },
    worstCaseSimulation: {
      scenario: 'Carrier does NOT reschedule BK-001',
      consequences: [
        'Container remains NOT_READY at slot time',
        'Truck denied at gate — 3rd denial today',
        'Booking auto-cancelled after 3 denials',
        'Carrier charged €280 (idle + penalty + storage)',
        'Terminal slot wasted — no recovery possible',
      ],
      probability: 0.65,
      recommendation: 'Reschedule now to avoid cascading failures.',
    },
    systemHealth: {
      status: 'HEALTHY',
      uptime: '99.97%',
      lastRestart: '2026-02-01T03:00:00Z',
      services: [
        { name: 'API Server', status: 'UP', responseTimeMs: 45 },
        { name: 'Database', status: 'UP', responseTimeMs: 12 },
        { name: 'AI Engine', status: 'UP', responseTimeMs: 320 },
        { name: 'Blockchain Node', status: 'UP', responseTimeMs: 180 },
        { name: 'WebSocket Gateway', status: 'UP', connections: 14 },
      ],
      recentIssues: [],
    },

    // ── Training & Help ──────────────────────────────────────────────────────
    onboardingGuide: {
      role: 'CARRIER',
      steps: [
        '1. Register → POST /auth/register with company info',
        '2. Add trucks → POST /carrier/trucks (plate + driver info)',
        '3. Add containers → POST /carrier/containers (number + type)',
        '4. Check slots → GET /slots/availability?terminalId=X&date=YYYY-MM-DD',
        '5. Create booking → POST /bookings (slotId + truckId + containerId)',
        '6. Monitor status → GET /bookings/my',
        '7. Gate access → Driver presents QR at gate',
      ],
      tips: [
        'Book off-peak slots (early morning or late afternoon) for less congestion',
        'Monitor readiness probability — reschedule early if below 50%',
        'Use AI chat for real-time guidance',
      ],
    },
    glossary: {
      terms: [
        {
          term: 'READY_TO_GO',
          definition:
            'Container has passed all checks (customs, inspection, documentation) and is cleared for pickup.',
          example:
            'Container TCLU7654321 is READY_TO_GO — the truck can proceed to the gate.',
        },
        {
          term: 'AT_RISK',
          definition:
            'Booking whose container may not be ready by the slot time. Readiness probability is below the threshold (default 50%).',
          example:
            'Booking BK-001 is AT_RISK because container MSCU1234567 has only 35% readiness probability.',
        },
        {
          term: 'Readiness Proof',
          definition:
            'A blockchain-anchored cryptographic hash proving a container was marked READY at a specific time. Immutable and auditable.',
          example:
            'Proof hash 0xabc123... on Ethereum Sepolia confirms TCLU7654321 was ready at 10:30 UTC.',
        },
        {
          term: 'Gate Denial',
          definition:
            'A truck is refused entry because the booking or container does not meet entry requirements.',
          example:
            'Truck AB-123-CD was denied because MSCU1234567 was not ready.',
        },
        {
          term: 'Congestion Forecast',
          definition:
            'AI prediction of terminal traffic levels in the coming hours, based on bookings, yard load, and historical patterns.',
          example:
            'Terminal A forecasts 92% occupancy next hour — divert trucks to Terminal B.',
        },
      ],
    },

    // ── Traffic ──────────────────────────────────────────────────────────────
    traffic: {
      window: 'next 60 minutes',
      incomingTrucks: 18,
      congestion: 'HIGH',
    },
  };

  async testChat(message: string): Promise<Record<string, any>> {
    if (process.env.AI_DISABLED === 'true') {
      this.logger.warn('[AI FALLBACK USED] AI_DISABLED=true → mock chat');
      return {
        intent: 'UNKNOWN',
        summary: 'AI is disabled.',
        data: {},
        nextAction: 'Enable AI by setting AI_DISABLED=false.',
      };
    }

    if (
      !this.aiApiKey ||
      this.aiApiKey === 'your-api-key' ||
      this.aiApiKey === 'your-openai-api-key'
    ) {
      const msg = 'No valid AI_API_KEY configured';
      this.logger.error(`[AI PROVIDER ERROR] ${msg}`);
      return { error: 'AI_PROVIDER_ERROR', details: msg };
    }

    const systemPrompt =
      'You are PORTFLOW AI, a port operations assistant.\n' +
      'You serve 4 roles: Carrier/Driver, Terminal Operator, Gate Agent, Port Admin.\n\n' +
      'DETECT the user intent from the following categories:\n\n' +
      '── CARRIER / DRIVER INTENTS (CORE) ──\n' +
      '• CHECK_SLOT_AVAILABILITY — Show available time slots (use availableSlots)\n' +
      '• CREATE_BOOKING — Help create a new booking (use availableSlots)\n' +
      "• VIEW_MY_BOOKINGS — List the user's bookings (use myBookings)\n" +
      '• CANCEL_BOOKING — Cancel a booking (use myBookings)\n' +
      '• CHECK_CONTAINER_STATUS — Container location & status (use containers)\n' +
      '• CHECK_READINESS_PROBABILITY — Readiness prediction (use containers.readinessProbability)\n' +
      '• EXPLAIN_AT_RISK — Why a booking is at risk (use myBookings where status=AT_RISK)\n' +
      '• GET_RESCHEDULE_OPTIONS — Suggest new slots for at-risk bookings (use rescheduleOptions)\n' +
      '• ACCEPT_RESCHEDULE — Confirm a rescheduled slot (use rescheduleOptions)\n' +
      '• CHECK_GATE_ACCESS — Can the truck enter the port? (use gateAccess)\n' +
      '• EXPLAIN_DENIAL — Why was gate access denied? (use gateAccess)\n' +
      '• GET_READINESS_PROOF — Blockchain proof of readiness (use readinessProof)\n\n' +
      '── CARRIER / DRIVER INTENTS (ADVANCED) ──\n' +
      '• CONTAINER_DELAY_REASON — Why is my container late / what is blocking it (use containerDelayAnalysis)\n' +
      '• CONTAINER_ETA — Predicted ETA with confidence (use containerEtaPrediction)\n' +
      '• COMPARE_CONTAINERS — Compare containers by readiness (use containerComparison)\n' +
      '• MINIMIZE_WAITING_TIME — Fastest option / minimize waiting (use waitingTimeSimulation)\n' +
      '• ESTIMATE_COST_IMPACT — Cost of delay vs reschedule (use costImpactEstimate)\n' +
      '• FLEET_OVERVIEW — Fleet status overview (use fleetOverview)\n' +
      '• ASSIGN_TRUCK — Assign/change truck for a booking (use truckAssignment)\n' +
      '• DRIVER_INSTRUCTIONS — Step-by-step guidance for the driver (use driverInstructions)\n\n' +
      '── TERMINAL OPERATOR INTENTS (CORE) ──\n' +
      '• LIST_PENDING_CONTAINERS — Containers awaiting action (use pendingContainers)\n' +
      '• UPDATE_CONTAINER_STATUS — Change container status (use pendingContainers)\n' +
      '• CONFIRM_READINESS — Mark container as ready (use containers)\n' +
      '• PREDICT_CONGESTION — Terminal congestion forecast (use congestionForecast)\n' +
      '• PRIORITIZE_OPERATIONS — What to do first (use operationalPriorities)\n' +
      '• VIEW_ALERTS — Current alerts & warnings (use activeAlerts)\n' +
      '• BLOCKING_CONTAINERS — Containers blocking operations today (use pendingContainers)\n\n' +
      '── TERMINAL OPERATOR INTENTS (ADVANCED) ──\n' +
      '• YARD_LOAD_STATUS — Yard occupancy & overflow risk (use yardStatus)\n' +
      '• CONTAINER_SEQUENCE_OPTIMIZATION — Optimal unloading order (use containerSequence)\n' +
      '• SIMULATE_TERMINAL_SCENARIO — What-if capacity simulation (use terminalSimulation)\n' +
      '• DETECT_HIGH_RISK_DAY — Is today risky? (use dailyRiskAssessment)\n' +
      '• ESCALATE_DELAY — Escalate a critical delay (use escalation)\n\n' +
      '── GATE AGENT INTENTS (CORE) ──\n' +
      '• VALIDATE_GATE_ACCESS — Validate a truck at the gate (use gateValidation)\n' +
      '• EXPLAIN_GATE_DECISION — Why was a truck allowed/denied (use gateValidation or gateAccess)\n' +
      '• ESTIMATE_ENTRY_TIME — When can a denied truck re-enter (use gateEntryEstimate)\n\n' +
      '── GATE AGENT INTENTS (EXTENDED) ──\n' +
      '• CHECK_QUEUE_STATUS — Gate queue length & wait time (use gateQueueStatus)\n' +
      '• REDIRECT_TRUCK — Where to send a truck / waiting zone (use truckRedirect)\n' +
      '• OVERRIDE_ACCESS_REQUEST — Emergency / manual override request (use overrideRequest)\n' +
      '• VERIFY_DRIVER_ID — Verify driver identity & authorization (use driverVerification)\n\n' +
      '── PORT ADMIN INTENTS (CORE) ──\n' +
      '• GET_KPI_SUMMARY — Daily performance metrics (use kpiSummary)\n' +
      '• ANALYZE_DELAYS — Delay causes & patterns (use delayAnalysis)\n' +
      '• EVALUATE_AI_IMPACT — How AI is improving operations (use aiImpact)\n' +
      '• VIEW_AUDIT_TRAIL — Full audit log for a booking (use auditTrail)\n' +
      '• VERIFY_BLOCKCHAIN_PROOF — Validate a blockchain proof (use blockchainVerification)\n\n' +
      '── PORT ADMIN INTENTS (STRATEGIC) ──\n' +
      '• COMPARE_TERMINALS — Compare terminal KPIs (use terminalComparison)\n' +
      '• DEFINE_POLICY — Change/view policy configuration (use policyConfig)\n' +
      '• EVALUATE_CARRIER_BEHAVIOR — Rank carriers by reliability (use carrierBehaviorAnalysis)\n' +
      '• GENERATE_INCIDENT_REPORT — Compile incident report (use incidentReport)\n' +
      '• EXPORT_COMPLIANCE_DATA — Export audit/compliance data (use complianceExport)\n\n' +
      '── META / SYSTEM INTENTS ──\n' +
      '• EXPLAIN_AI_DECISION — Why did AI recommend this? (use aiDecisionExplanation)\n' +
      "• SIMULATE_USER_ACTION — What happens if I don't act? (use worstCaseSimulation)\n" +
      '• SYSTEM_HEALTH — Is the system healthy? (use systemHealth)\n' +
      '• TRAIN_NEW_USER — Onboarding / teach me how to use this (use onboardingGuide)\n' +
      '• EXPLAIN_TERM — Define a port/system term (use glossary)\n\n' +
      '── GENERAL ──\n' +
      '• TRAFFIC_FORECAST — Traffic & congestion prediction (use traffic)\n' +
      '• SLOT_RECOMMENDATION — Best slot to book (use availableSlots)\n' +
      '• BOOKING_RISK — Check booking risk status (use myBookings)\n' +
      '• CONTAINER_STATUS — Container location & status (alias for CHECK_CONTAINER_STATUS)\n\n' +
      'RULES:\n' +
      '- Use ONLY the provided context data — do NOT invent data\n' +
      '- Respond with structured JSON only\n' +
      '- Always suggest a next action\n' +
      '- Pick the MOST SPECIFIC intent that matches\n\n' +
      'Respond ONLY with valid JSON in this exact format:\n' +
      '{\n' +
      '  "intent": "<one of the intents above>",\n' +
      '  "summary": "Short human-readable answer",\n' +
      '  "data": { ... relevant data from context ... },\n' +
      '  "nextAction": "What the user should do next"\n' +
      '}\n\n' +
      'If you cannot determine the intent, respond with:\n' +
      '{\n' +
      '  "intent": "UNKNOWN",\n' +
      '  "summary": "I did not understand your request.",\n' +
      '  "data": {},\n' +
      '  "nextAction": "Try asking about bookings, containers, slots, traffic, gate access, KPIs, or operations."\n' +
      '}';

    const userMessage =
      `User question: "${message}"\n\n` +
      `Available context data:\n${JSON.stringify(this.MOCK_CONTEXT, null, 2)}`;

    try {
      this.logger.log(
        `[AI CALL] test-chat → model=${this.aiModel} promptChars=${systemPrompt.length + userMessage.length}`,
      );

      const response = await fetch(`${this.aiBaseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.aiApiKey}`,
          'HTTP-Referer': 'https://portflow.ai',
          'X-Title': 'PORTFLOW AI Test Chat',
        },
        body: JSON.stringify({
          model: this.aiModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
          temperature: 0.2,
          max_tokens: 1024,
          provider: { data_collection: 'allow' },
        }),
      });

      this.logger.log(`[AI RESPONSE] test-chat status=${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(
          `[AI PROVIDER ERROR] test-chat ${response.status}: ${errorText}`,
        );
        return {
          error: 'AI_PROVIDER_ERROR',
          status: response.status,
          details: errorText,
        };
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        this.logger.warn(
          '[AI PROVIDER ERROR] No content in test-chat response',
        );
        return {
          error: 'AI_PROVIDER_ERROR',
          details: 'Empty response from model',
        };
      }

      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        this.logger.warn(
          '[AI PARSE ERROR] Could not parse JSON from test-chat response',
        );
        return {
          error: 'AI_PARSE_ERROR',
          details: 'Model did not return valid JSON',
          raw: content,
        };
      }

      const parsed = JSON.parse(jsonMatch[0]);
      this.logger.log(`[AI REAL RESPONSE] test-chat intent=${parsed.intent}`);
      return { source: 'ai', ...parsed };
    } catch (error) {
      this.logger.error(`[AI PROVIDER ERROR] test-chat exception: ${error}`);
      return { error: 'AI_PROVIDER_ERROR', details: String(error) };
    }
  }

  // ─── AI Readiness Prediction ────────────────────────────────────────────────

  async getReadinessPrediction(bookingId: string) {
    // Look up the booking with container info
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        container: true,
        terminal: { select: { name: true } },
        timeSlot: { select: { startTime: true, endTime: true } },
      },
    });

    if (!booking) {
      return {
        bookingId,
        error: 'Booking not found',
      };
    }

    // Calculate readiness based on available data (0–100 scale)
    const blockers: string[] = [];
    let probability = 100;

    // Check container status
    if (booking.container) {
      if (booking.container.status === 'NOT_ARRIVED') {
        blockers.push('Container has not arrived at the terminal');
        probability -= 40;
      } else if (booking.container.status === 'IN_YARD') {
        blockers.push('Container is in yard but not yet cleared/ready');
        probability -= 20;
      }
      // READY or RELEASED are fine
    } else if (booking.containerId) {
      blockers.push('Container record not found');
      probability -= 30;
    }

    // Check booking status
    if (booking.status === 'PENDING') {
      blockers.push('Booking is still pending operator approval');
      probability -= 30;
    } else if (booking.status === 'AT_RISK') {
      blockers.push('Booking is flagged as at-risk');
      probability -= 20;
    }

    // Check blockchain proof
    if (!booking.blockchainHash) {
      blockers.push('No blockchain proof generated yet');
      probability -= 10;
    }

    // Check QR token
    if (!booking.qrToken) {
      blockers.push('QR code not yet generated');
      probability -= 10;
    }

    // Check time proximity
    if (booking.timeSlot) {
      const now = new Date();
      const slotStart = new Date(booking.timeSlot.startTime);
      const hoursUntil =
        (slotStart.getTime() - now.getTime()) / (1000 * 60 * 60);
      if (hoursUntil < 0) {
        blockers.push('Time slot has already passed');
        probability -= 30;
      }
    }

    probability = Math.max(0, Math.min(100, probability));

    const riskLevel =
      probability >= 80 ? 'LOW' : probability >= 50 ? 'MEDIUM' : 'HIGH';

    // Persist ReadinessPrediction record
    await this.prisma.readinessPrediction.create({
      data: {
        bookingId,
        probability,
        riskLevel,
        computedAt: new Date(),
      },
    });

    // AT_RISK automation: if probability < 50 and booking is CONFIRMED, flag it
    if (
      probability < 50 &&
      (booking.status === 'CONFIRMED' || booking.status === 'PENDING')
    ) {
      await this.prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'AT_RISK' },
      });
      this.eventsGateway.emitBookingAtRisk(bookingId, {
        probability,
        riskLevel,
        blockers,
      });
    }

    return {
      bookingId,
      status: booking.status,
      containerStatus: booking.container?.status || null,
      terminal: booking.terminal?.name || null,
      timeSlot: booking.timeSlot || null,
      probability,
      riskLevel,
      blockers,
      recommendation:
        blockers.length === 0
          ? 'Booking is fully ready for gate entry'
          : `${blockers.length} issue(s) need attention before gate entry`,
    };
  }

  // ─── Test: AI Slot Recommendation ──────────────────────────────────────────

  private readonly MOCK_SLOTS = [
    { date: '2026-02-07', start: '08:00', end: '09:00', congestion: 'high' },
    { date: '2026-02-07', start: '09:30', end: '10:30', congestion: 'low' },
    { date: '2026-02-07', start: '11:00', end: '12:00', congestion: 'medium' },
  ];

  async recommendSlot(message: string): Promise<Record<string, any>> {
    const isTestMode = this.aiTestMode;

    // Only fallback for explicit AI_DISABLED — NOT for provider errors
    if (process.env.AI_DISABLED === 'true') {
      this.logger.warn('[AI FALLBACK USED] AI_DISABLED=true → mock response');
      return {
        source: 'fallback',
        recommendedSlot: { date: '2026-02-07', start: '09:30', end: '10:30' },
        reason:
          'This slot is in the morning and has low congestion. (mock — AI_DISABLED)',
      };
    }

    if (
      !this.aiApiKey ||
      this.aiApiKey === 'your-api-key' ||
      this.aiApiKey === 'your-openai-api-key'
    ) {
      const msg = 'No valid AI_API_KEY configured';
      this.logger.error(`[AI PROVIDER ERROR] ${msg}`);
      if (isTestMode) {
        return { error: 'AI_PROVIDER_ERROR', details: msg };
      }
      return {
        source: 'fallback',
        recommendedSlot: { date: '2026-02-07', start: '09:30', end: '10:30' },
        reason: 'Fallback: no API key. Best morning slot with low congestion.',
      };
    }

    const systemPrompt =
      'You are a scheduling assistant for a maritime port.\n' +
      'You must recommend ONE slot from the provided list.\n' +
      "Prefer low congestion and match the user's time preference.\n" +
      'You must NOT invent new slots.\n' +
      'Respond ONLY with valid JSON in this exact format:\n' +
      '{\n' +
      '  "recommendedSlot": { "date": "YYYY-MM-DD", "start": "HH:MM", "end": "HH:MM" },\n' +
      '  "reason": "Short explanation"\n' +
      '}\n' +
      'If no slot matches, respond: { "message": "No suitable slot found" }';

    const userMessage =
      `Client request: "${message}"\n\n` +
      `Available slots:\n${JSON.stringify(this.MOCK_SLOTS, null, 2)}`;

    try {
      this.logger.log(
        `[AI CALL] recommend-slot → model=${this.aiModel} promptChars=${systemPrompt.length + userMessage.length}`,
      );

      const response = await fetch(`${this.aiBaseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.aiApiKey}`,
          'HTTP-Referer': 'https://portflow.ai',
          'X-Title': 'PORTFLOW AI Test',
        },
        body: JSON.stringify({
          model: this.aiModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
          temperature: 0.3,
          max_tokens: 256,
          provider: { data_collection: 'allow' },
        }),
      });

      this.logger.log(`[AI RESPONSE] recommend-slot status=${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(
          `[AI PROVIDER ERROR] recommend-slot ${response.status}: ${errorText}`,
        );
        // In test mode: expose the error, do NOT silently fallback
        if (isTestMode) {
          return {
            error: 'AI_PROVIDER_ERROR',
            status: response.status,
            details: errorText,
          };
        }
        return {
          source: 'fallback',
          recommendedSlot: { date: '2026-02-07', start: '09:30', end: '10:30' },
          reason:
            'Fallback: AI API error. Best morning slot with low congestion.',
        };
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        this.logger.warn('[AI PROVIDER ERROR] No content in response choices');
        return isTestMode
          ? { error: 'AI_PROVIDER_ERROR', details: 'Empty response from model' }
          : { message: 'No suitable slot found' };
      }

      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        this.logger.warn(
          '[AI PROVIDER ERROR] Could not parse JSON from AI response',
        );
        return isTestMode
          ? {
              error: 'AI_PARSE_ERROR',
              details: 'Model did not return valid JSON',
              raw: content,
            }
          : { message: 'No suitable slot found' };
      }

      const parsed = JSON.parse(jsonMatch[0]);
      this.logger.log('[AI REAL RESPONSE] recommend-slot returned valid JSON');
      return { source: 'ai', ...parsed };
    } catch (error) {
      this.logger.error(
        `[AI PROVIDER ERROR] recommend-slot exception: ${error}`,
      );
      if (isTestMode) {
        return {
          error: 'AI_PROVIDER_ERROR',
          details: String(error),
        };
      }
      return {
        source: 'fallback',
        recommendedSlot: { date: '2026-02-07', start: '09:30', end: '10:30' },
        reason:
          'Fallback: AI unavailable. Best morning slot with low congestion.',
      };
    }
  }
}
