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
        timestamp: Date;
        sessionId: string;
        content: string;
    }[]>;
    testChat(dto: TestChatDto): Promise<Record<string, any>>;
    recommendSlot(dto: RecommendSlotDto): Promise<Record<string, any>>;
}
