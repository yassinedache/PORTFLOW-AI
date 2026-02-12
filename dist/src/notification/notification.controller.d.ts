import { NotificationService } from './notification.service.js';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getNotifications(req: any, page?: string, limit?: string, unreadOnly?: string): Promise<{
        data: ({
            booking: {
                id: string;
                status: import("../../generated/prisma/enums.js").BookingStatus;
            } | null;
        } & {
            type: string;
            title: string;
            id: string;
            createdAt: Date;
            userId: string;
            bookingId: string | null;
            message: string;
            read: boolean;
        })[];
        unreadCount: number;
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getUnreadCount(req: any): Promise<{
        count: number;
    }>;
    markAsRead(id: string, req: any): Promise<{
        success: boolean;
    }>;
    markAllAsRead(req: any): Promise<{
        success: boolean;
    }>;
}
