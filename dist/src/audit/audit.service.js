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
let AuditService = class AuditService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAuditLogs(params) {
        const page = params.page || 1;
        const limit = params.limit || 50;
        const skip = (page - 1) * limit;
        const where = {};
        if (params.userId)
            where.userId = params.userId;
        if (params.entity)
            where.entity = { contains: params.entity };
        if (params.action)
            where.action = { contains: params.action };
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
    async getWaitingTimeAnalytics(terminalId, days = 30) {
        const since = new Date();
        since.setDate(since.getDate() - days);
        const where = { date: { gte: since } };
        if (terminalId)
            where.terminalId = terminalId;
        const metrics = await this.prisma.metricDaily.findMany({
            where,
            include: {
                terminal: { select: { id: true, name: true } },
            },
            orderBy: { date: 'asc' },
        });
        const avgWaiting = metrics.length > 0
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
};
AuditService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AuditService);
export { AuditService };
//# sourceMappingURL=audit.service.js.map