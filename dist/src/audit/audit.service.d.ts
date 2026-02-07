import { PrismaService } from '../prisma/prisma.service.js';
export declare class AuditService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAuditLogs(params: {
        page?: number;
        limit?: number;
        userId?: string;
        entity?: string;
        action?: string;
    }): Promise<{
        data: ({
            user: {
                id: string;
                email: string;
                role: import("../../generated/prisma/enums.js").Role;
            } | null;
        } & {
            id: string;
            userId: string | null;
            timestamp: Date;
            action: string;
            entity: string;
            entityId: string | null;
            meta: import("@prisma/client/runtime/client").JsonValue | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getWaitingTimeAnalytics(terminalId?: string, days?: number): Promise<{
        period: {
            from: Date;
            to: Date;
            days: number;
        };
        summary: {
            avgWaitingTime: number;
            totalBookings: number;
            totalRevenue: number;
        };
        daily: ({
            terminal: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            terminalId: string;
            date: Date;
            avgWaitingTime: number;
            totalBookings: number;
            revenue: number;
        })[];
    }>;
}
