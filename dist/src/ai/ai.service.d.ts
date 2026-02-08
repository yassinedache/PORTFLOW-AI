import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { SlotsService } from '../slots/slots.service.js';
import { BookingService } from '../booking/booking.service.js';
import { RequestUser } from '../common/interfaces/jwt-payload.interface.js';
import { AiQueryDto } from './dto/ai.dto.js';
import { EventsGateway } from '../events/events.gateway.js';
export declare class AiService {
    private readonly prisma;
    private readonly configService;
    private readonly slotsService;
    private readonly bookingService;
    private readonly eventsGateway;
    private readonly logger;
    private readonly aiProvider;
    private readonly aiApiKey;
    private readonly aiModel;
    private readonly aiBaseUrl;
    private readonly aiTestMode;
    constructor(prisma: PrismaService, configService: ConfigService, slotsService: SlotsService, bookingService: BookingService, eventsGateway: EventsGateway);
    createSession(user: RequestUser): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
    }>;
    query(dto: AiQueryDto, user: RequestUser): Promise<{
        sessionId: string;
        response: string;
    }>;
    getHistory(sessionId: string, user: RequestUser): Promise<{
        id: string;
        sessionId: string;
        role: import("../../generated/prisma/enums.js").AiMessageRole;
        content: string;
        timestamp: Date;
    }[]>;
    private processWithLlm;
    private handleToolCalls;
    private executeTool;
    private toolCheckAvailability;
    private toolGetMyBookings;
    private toolGetPortStatus;
    private toolGetHeatmap;
    private toolTrackContainer;
    private toolCreateBooking;
    private toolCancelBooking;
    private processWithRules;
    private handleAvailabilityQuery;
    private handleMyBookingsQuery;
    private handleBookingIntent;
    private handleCancelIntent;
    private handleContainerTrack;
    private handleStatusQuery;
    private handleHelpQuery;
    private buildSystemPrompt;
    private readonly MOCK_CONTEXT;
    testChat(message: string): Promise<Record<string, any>>;
    getReadinessPrediction(bookingId: string): Promise<{
        bookingId: string;
        error: string;
        status?: undefined;
        containerStatus?: undefined;
        terminal?: undefined;
        timeSlot?: undefined;
        probability?: undefined;
        riskLevel?: undefined;
        blockers?: undefined;
        recommendation?: undefined;
    } | {
        bookingId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        containerStatus: import("../../generated/prisma/enums.js").ContainerStatus;
        terminal: string | null;
        timeSlot: {
            startTime: Date;
            endTime: Date;
        };
        probability: number;
        riskLevel: string;
        blockers: string[];
        recommendation: string;
        error?: undefined;
    }>;
    private readonly MOCK_SLOTS;
    recommendSlot(message: string): Promise<Record<string, any>>;
}
