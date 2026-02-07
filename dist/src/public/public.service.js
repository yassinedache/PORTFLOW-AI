var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let PublicService = class PublicService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
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
    async getStats() {
        const [totalBookings, totalAccess, terminals, todayBookings] = await Promise.all([
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
    async trackContainer(containerNumber) {
        const container = await this.prisma.container.findUnique({
            where: { containerNumber },
            include: {
                trackingEvents: {
                    orderBy: { timestamp: 'desc' },
                },
            },
        });
        if (!container) {
            throw new NotFoundException(`Container ${containerNumber} not found`);
        }
        return {
            containerNumber: container.containerNumber,
            events: container.trackingEvents,
        };
    }
};
PublicService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], PublicService);
export { PublicService };
//# sourceMappingURL=public.service.js.map