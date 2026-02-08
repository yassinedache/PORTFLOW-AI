import { AiService } from './ai.service.js';
import { AiQueryDto, RecommendSlotDto, TestChatDto } from './dto/ai.dto.js';
import type { RequestUser } from '../common/interfaces/jwt-payload.interface.js';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    createSession(user: RequestUser): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
    }>;
    query(dto: AiQueryDto, user: RequestUser): Promise<{
        sessionId: string;
        response: string;
    }>;
    getHistory(id: string, user: RequestUser): Promise<{
        id: string;
        role: import("../../generated/prisma/enums.js").AiMessageRole;
        content: string;
        timestamp: Date;
        sessionId: string;
    }[]>;
    testChat(dto: TestChatDto): Promise<Record<string, any>>;
    getReadiness(bookingId: string): Promise<{
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
    recommendSlot(dto: RecommendSlotDto): Promise<Record<string, any>>;
}
