import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PublicService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Real-time pulse: current port activity summary
   */
  async getPulse() {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    const [activeBookings, recentAccess, terminals] = await Promise.all([
      this.prisma.booking.count({
        where: { status: { in: ['PENDING', 'CONFIRMED'] } },
      }),
      this.prisma.gateAccessLog.count({
        where: { scannedAt: { gte: oneHourAgo } },
      }),
      this.prisma.terminal.findMany({
        where: { isActive: true },
        select: { id: true, name: true },
      }),
    ]);

    return {
      timestamp: now.toISOString(),
      activeBookings,
      recentGateAccess: recentAccess,
      activeTerminals: terminals.length,
      terminals: terminals.map((t) => ({ id: t.id, name: t.name })),
    };
  }

  /**
   * Aggregate statistics for the landing page
   */
  async getStats() {
    const [totalBookings, totalAccess, terminals, todayBookings] =
      await Promise.all([
        this.prisma.booking.count(),
        this.prisma.gateAccessLog.count({ where: { result: 'ALLOWED' } }),
        this.prisma.terminal.count({ where: { isActive: true } }),
        this.prisma.booking.count({
          where: {
            createdAt: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
            },
          },
        }),
      ]);

    return {
      totalBookings,
      totalGateAccess: totalAccess,
      activeTerminals: terminals,
      todayBookings,
    };
  }

  /**
   * Track a container by its number
   */
  async trackContainer(containerNumber: string) {
    const container = await this.prisma.container.findUnique({
      where: { containerNumber },
      include: {
        trackingEvents: {
          orderBy: { timestamp: 'desc' },
        },
      },
    });

    if (!container) {
      throw new NotFoundException(
        `Container ${containerNumber} not found`,
      );
    }

    return {
      containerNumber: container.containerNumber,
      events: container.trackingEvents,
    };
  }
}
