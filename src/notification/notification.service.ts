import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { EventsGateway } from '../events/events.gateway.js';

export type NotificationType =
  | 'BOOKING_PENDING'
  | 'BOOKING_APPROVED'
  | 'BOOKING_REJECTED'
  | 'PRIORITY_PURCHASED'
  | 'PENALTY_APPLIED';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async create(params: {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    bookingId?: string;
  }) {
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

    // Emit real-time notification
    this.eventsGateway.emitNotification(params.userId, notification);

    return notification;
  }

  async getForUser(
    userId: string,
    params: { page?: number; limit?: number; unreadOnly?: boolean },
  ) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = { userId };
    if (params.unreadOnly) where.read = false;

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

  async markAsRead(notificationId: string, userId: string) {
    return this.prisma.notification.updateMany({
      where: { id: notificationId, userId },
      data: { read: true },
    });
  }

  async markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  }

  async getUnreadCount(userId: string) {
    return this.prisma.notification.count({
      where: { userId, read: false },
    });
  }

  // ─── Helper methods for creating specific notifications ─────────────────

  async notifyOperatorsOfPendingBooking(booking: {
    id: string;
    carrier: { email: string };
    terminal: { name: string };
    timeSlot: { start: Date };
  }) {
    // Find all operators for this terminal (or all operators if no terminal-specific assignment)
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

  async notifyCarrierOfApproval(booking: {
    id: string;
    carrierId: string;
    terminal: { name: string };
    timeSlot: { start: Date };
  }) {
    const slotTime = new Date(booking.timeSlot.start).toLocaleString();

    return this.create({
      userId: booking.carrierId,
      type: 'BOOKING_APPROVED',
      title: 'Booking Approved',
      message: `Your booking at ${booking.terminal.name} on ${slotTime} has been approved`,
      bookingId: booking.id,
    });
  }

  async notifyCarrierOfRejection(
    booking: {
      id: string;
      carrierId: string;
      terminal: { name: string };
      timeSlot: { start: Date };
    },
    reason?: string,
  ) {
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

  async notifyCarrierOfPenalty(
    booking: {
      id: string;
      carrierId: string;
    },
    penaltyType: string,
    amount: number,
  ) {
    return this.create({
      userId: booking.carrierId,
      type: 'PENALTY_APPLIED',
      title: 'Penalty Applied',
      message: `A ${penaltyType} penalty of $${amount.toFixed(2)} has been applied to your booking`,
      bookingId: booking.id,
    });
  }
}
