import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async getAuditLogs(params: {
    page?: number;
    limit?: number;
    userId?: string;
    entity?: string;
    action?: string;
  }) {
    const page = params.page || 1;
    const limit = params.limit || 50;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (params.userId) where.userId = params.userId;
    if (params.entity) where.entity = { contains: params.entity };
    if (params.action) where.action = { contains: params.action };

    const [logs, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        include: {
          user: { select: { id: true, email: true, role: true } },
        },
        orderBy: { timestamp: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return {
      data: logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getWaitingTimeAnalytics(terminalId?: string, days: number = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const where: any = { date: { gte: since } };
    if (terminalId) where.terminalId = terminalId;

    const metrics = await this.prisma.metricDaily.findMany({
      where,
      include: {
        terminal: { select: { id: true, name: true } },
      },
      orderBy: { date: 'asc' },
    });

    // Calculate averages
    const avgWaiting =
      metrics.length > 0
        ? metrics.reduce((sum, m) => sum + m.avgWaitingTime, 0) / metrics.length
        : 0;

    const totalBookings = metrics.reduce((sum, m) => sum + m.totalBookings, 0);
    const totalRevenue = metrics.reduce((sum, m) => sum + m.revenue, 0);

    return {
      period: { from: since, to: new Date(), days },
      summary: {
        avgWaitingTime: Math.round(avgWaiting * 100) / 100,
        totalBookings,
        totalRevenue: Math.round(totalRevenue * 100) / 100,
      },
      daily: metrics,
    };
  }
}
