var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { EventsGateway } from '../events/events.gateway.js';
let NotificationService = class NotificationService {
    prisma;
    eventsGateway;
    constructor(prisma, eventsGateway) {
        this.prisma = prisma;
        this.eventsGateway = eventsGateway;
    }
    async create(params) {
        const notification = await this.prisma.notification.create({
            data: {
                userId: params.userId,
                type: params.type,
                title: params.title,
                message: params.message,
                bookingId: params.bookingId,
            },
            include: {
                booking: { select: { id: true, status: true } },
            },
        });
        this.eventsGateway.emitNotification(params.userId, notification);
        return notification;
    }
    async getForUser(userId, params) {
        const page = params.page || 1;
        const limit = params.limit || 20;
        const skip = (page - 1) * limit;
        const where = { userId };
        if (params.unreadOnly)
            where.read = false;
        const [notifications, total, unreadCount] = await Promise.all([
            this.prisma.notification.findMany({
                where,
                include: {
                    booking: { select: { id: true, status: true } },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.notification.count({ where }),
            this.prisma.notification.count({ where: { userId, read: false } }),
        ]);
        return {
            data: notifications,
            unreadCount,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async markAsRead(notificationId, userId) {
        return this.prisma.notification.updateMany({
            where: { id: notificationId, userId },
            data: { read: true },
        });
    }
    async markAllAsRead(userId) {
        return this.prisma.notification.updateMany({
            where: { userId, read: false },
            data: { read: true },
        });
    }
    async getUnreadCount(userId) {
        return this.prisma.notification.count({
            where: { userId, read: false },
        });
    }
    async notifyOperatorsOfPendingBooking(booking) {
        const operators = await this.prisma.user.findMany({
            where: { role: 'TERMINAL_OPERATOR' },
            select: { id: true },
        });
        const slotTime = new Date(booking.timeSlot.start).toLocaleString();
        for (const operator of operators) {
            await this.create({
                userId: operator.id,
                type: 'BOOKING_PENDING',
                title: 'New Booking Request',
                message: `${booking.carrier.email} requested a slot at ${booking.terminal.name} on ${slotTime}`,
                bookingId: booking.id,
            });
        }
    }
    async notifyCarrierOfApproval(booking) {
        const slotTime = new Date(booking.timeSlot.start).toLocaleString();
        return this.create({
            userId: booking.carrierId,
            type: 'BOOKING_APPROVED',
            title: 'Booking Approved',
            message: `Your booking at ${booking.terminal.name} on ${slotTime} has been approved`,
            bookingId: booking.id,
        });
    }
    async notifyCarrierOfRejection(booking, reason) {
        const slotTime = new Date(booking.timeSlot.start).toLocaleString();
        const reasonText = reason ? `: ${reason}` : '';
        return this.create({
            userId: booking.carrierId,
            type: 'BOOKING_REJECTED',
            title: 'Booking Rejected',
            message: `Your booking at ${booking.terminal.name} on ${slotTime} has been rejected${reasonText}`,
            bookingId: booking.id,
        });
    }
    async notifyCarrierOfPenalty(booking, penaltyType, amount) {
        return this.create({
            userId: booking.carrierId,
            type: 'PENALTY_APPLIED',
            title: 'Penalty Applied',
            message: `A ${penaltyType} penalty of $${amount.toFixed(2)} has been applied to your booking`,
            bookingId: booking.id,
        });
    }
};
NotificationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        EventsGateway])
], NotificationService);
export { NotificationService };
//# sourceMappingURL=notification.service.js.map