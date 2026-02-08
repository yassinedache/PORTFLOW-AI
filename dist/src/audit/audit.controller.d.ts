import { AuditService } from './audit.service.js';
import { Role } from '../../generated/prisma/client.js';
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditService);
    getAuditLogs(page?: string, limit?: string, userId?: string, entity?: string, action?: string): Promise<{
        data: ({
            user: {
                email: string;
                role: Role;
                id: string;
            } | null;
        } & {
            id: string;
            userId: string | null;
            action: string;
            entity: string;
            entityId: string | null;
            meta: import("@prisma/client/runtime/client").JsonValue | null;
            timestamp: Date;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getWaitingTimeAnalytics(terminalId?: string, days?: string): Promise<{
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
            totalBookings: number;
            avgWaitingTime: number;
            revenue: number;
        })[];
    }>;
}
