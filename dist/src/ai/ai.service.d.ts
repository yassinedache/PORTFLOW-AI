import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { SlotsService } from '../slots/slots.service.js';
import { BookingService } from '../booking/booking.service.js';
import { RequestUser } from '../common/interfaces/jwt-payload.interface.js';
import { AiQueryDto } from './dto/ai.dto.js';
export declare class AiService {
    private readonly prisma;
    private readonly configService;
    private readonly slotsService;
    private readonly bookingService;
    private readonly logger;
    private readonly aiProvider;
    private readonly aiApiKey;
    private readonly aiModel;
    private readonly aiBaseUrl;
    private readonly aiTestMode;
    constructor(prisma: PrismaService, configService: ConfigService, slotsService: SlotsService, bookingService: BookingService);
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
        role: import("../../generated/prisma/enums.js").AiMessageRole;
        timestamp: Date;
        sessionId: string;
        content: string;
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
    private readonly MOCK_SLOTS;
    recommendSlot(message: string): Promise<Record<string, any>>;
}
