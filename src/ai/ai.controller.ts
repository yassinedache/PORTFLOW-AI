import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service.js';
import { AiQueryDto, RecommendSlotDto, TestChatDto } from './dto/ai.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import type { RequestUser } from '../common/interfaces/jwt-payload.interface.js';

@ApiTags('AI Assistant')
@ApiBearerAuth()
@Controller('ai')
@UseGuards(RolesGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('sessions')
  @ApiOperation({ summary: 'Create a new AI chat session' })
  createSession(@CurrentUser() user: RequestUser) {
    return this.aiService.createSession(user);
  }

  @Post('query')
  @ApiOperation({ summary: 'Send a query to the AI assistant' })
  query(@Body() dto: AiQueryDto, @CurrentUser() user: RequestUser) {
    return this.aiService.query(dto, user);
  }

  @Get('sessions/:id/history')
  @ApiOperation({ summary: 'Get AI session chat history' })
  getHistory(@Param('id') id: string, @CurrentUser() user: RequestUser) {
    return this.aiService.getHistory(id, user);
  }

  /**
   * TEST-ONLY: AI conversational chat — replaces dashboard menus.
   * Detects intent (CONTAINER_STATUS, BOOKING_RISK, SLOT_RECOMMENDATION, TRAFFIC_FORECAST)
   * and returns structured JSON with data + nextAction.
   * No auth, no CSRF, no DB writes. Active only when AI_TEST_MODE=true.
   */
  @Post('test/chat')
  @ApiOperation({
    summary: '[TEST] AI conversational assistant (AI_TEST_MODE only)',
    description:
      'Ask natural language questions about containers, bookings, slots, or traffic. Returns structured intent + data + nextAction.',
  })
  testChat(@Body() dto: TestChatDto) {
    return this.aiService.testChat(dto.message);
  }

  /**
   * TEST-ONLY endpoint — active only when AI_TEST_MODE=true.
   * Bypasses CSRF and JWT guards (handled in guard logic).
   * No DB writes, no booking creation — uses hardcoded mock slots.
   * Always attempts a real AI call; errors are exposed, not masked.
   */
  @Get('readiness/:bookingId')
  @ApiOperation({
    summary: 'AI-powered readiness prediction for a booking',
    description: 'Returns readiness probability, blockers, and risk level.',
  })
  getReadiness(@Param('bookingId') bookingId: string) {
    return this.aiService.getReadinessPrediction(bookingId);
  }

  @Post('test/recommend-slot')
  @ApiOperation({
    summary: '[TEST] AI recommends the best slot (AI_TEST_MODE only)',
    description:
      'No auth or CSRF required when AI_TEST_MODE=true. Returns source: "ai" for real AI or error details on failure.',
  })
  recommendSlot(@Body() dto: RecommendSlotDto) {
    return this.aiService.recommendSlot(dto.message);
  }
}
