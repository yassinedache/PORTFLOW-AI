import { PrismaService } from '../prisma/prisma.service.js';
import { EventsGateway } from '../events/events.gateway.js';
export type NotificationType = 'BOOKING_PENDING' | 'BOOKING_APPROVED' | 'BOOKING_REJECTED' | 'PRIORITY_PURCHASED' | 'PENALTY_APPLIED';
export declare class NotificationService {
    private readonly prisma;
    private readonly eventsGateway;
    constructor(prisma: PrismaService, eventsGateway: EventsGateway);
    create(params: {
        userId: string;
        type: NotificationType;
        title: string;
        message: string;
        bookingId?: string;
    }): Promise<{
        booking: {
            id: string;
            status: import("../../generated/prisma/enums.js").BookingStatus;
        } | null;
    } & {
        id: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: Date;
        userId: string;
        bookingId: string | null;
    }>;
    getForUser(userId: string, params: {
        page?: number;
        limit?: number;
        unreadOnly?: boolean;
    }): Promise<{
        data: ({
            booking: {
                id: string;
                status: import("../../generated/prisma/enums.js").BookingStatus;
            } | null;
        } & {
            id: string;
            type: string;
            title: string;
            message: string;
            read: boolean;
            createdAt: Date;
            userId: string;
            bookingId: string | null;
        })[];
        unreadCount: number;
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    markAsRead(notificationId: string, userId: string): Promise<import("../../generated/prisma/internal/prismaNamespace.js").BatchPayload>;
    markAllAsRead(userId: string): Promise<import("../../generated/prisma/internal/prismaNamespace.js").BatchPayload>;
    getUnreadCount(userId: string): Promise<number>;
    notifyOperatorsOfPendingBooking(booking: {
        id: string;
        carrier: {
            email: string;
        };
        terminal: {
            name: string;
        };
        timeSlot: {
            start: Date;
        };
    }): Promise<void>;
    notifyCarrierOfApproval(booking: {
        id: string;
        carrierId: string;
        terminal: {
            name: string;
        };
        timeSlot: {
            start: Date;
        };
    }): Promise<{
        booking: {
            id: string;
            status: import("../../generated/prisma/enums.js").BookingStatus;
        } | null;
    } & {
        id: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: Date;
        userId: string;
        bookingId: string | null;
    }>;
    notifyCarrierOfRejection(booking: {
        id: string;
        carrierId: string;
        terminal: {
            name: string;
        };
        timeSlot: {
            start: Date;
        };
    }, reason?: string): Promise<{
        booking: {
            id: string;
            status: import("../../generated/prisma/enums.js").BookingStatus;
        } | null;
    } & {
        id: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: Date;
        userId: string;
        bookingId: string | null;
    }>;
    notifyCarrierOfPenalty(booking: {
        id: string;
        carrierId: string;
    }, penaltyType: string, amount: number): Promise<{
        booking: {
            id: string;
            status: import("../../generated/prisma/enums.js").BookingStatus;
        } | null;
    } & {
        id: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: Date;
        userId: string;
        bookingId: string | null;
    }>;
}
