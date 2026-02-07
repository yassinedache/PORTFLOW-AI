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
import { EventsGateway } from '../events/events.gateway.js';
let OperatorService = class OperatorService {
    prisma;
    eventsGateway;
    constructor(prisma, eventsGateway) {
        this.prisma = prisma;
        this.eventsGateway = eventsGateway;
    }
    async getQueue(terminalId) {
        const where = { status: { in: ['PENDING', 'CONFIRMED'] } };
        if (terminalId)
            where.terminalId = terminalId;
        return this.prisma.booking.findMany({
            where,
            include: {
                carrier: { select: { id: true, email: true } },
                terminal: { select: { id: true, name: true } },
                timeSlot: { select: { startTime: true, endTime: true } },
                truck: { select: { plate: true } },
            },
            orderBy: { createdAt: 'asc' },
        });
    }
    async overrideCapacity(dto) {
        const slot = await this.prisma.timeSlot.findUnique({
            where: { id: dto.timeSlotId },
        });
        if (!slot)
            throw new NotFoundException('Time slot not found');
        const updated = await this.prisma.timeSlot.update({
            where: { id: dto.timeSlotId },
            data: { capacity: dto.newCapacity },
        });
        this.eventsGateway.emitAlert({
            type: 'capacity-override',
            message: `Capacity for slot ${slot.id} changed to ${dto.newCapacity}`,
            terminalId: slot.terminalId,
        });
        this.eventsGateway.emitQueueUpdate(slot.terminalId);
        return updated;
    }
    async getAlerts(terminalId) {
        const recentDenials = await this.prisma.gateAccessLog.findMany({
            where: {
                result: 'DENIED',
                ...(terminalId
                    ? { gate: { terminalId } }
                    : {}),
            },
            include: {
                gate: { select: { name: true, terminalId: true } },
                booking: { select: { id: true, carrierId: true } },
            },
            orderBy: { scannedAt: 'desc' },
            take: 20,
        });
        const now = new Date();
        const slotsNearCapacity = await this.prisma.timeSlot.findMany({
            where: {
                startTime: { gte: now },
                ...(terminalId ? { terminalId } : {}),
            },
            include: {
                terminal: { select: { name: true } },
                _count: {
                    select: {
                        bookings: {
                            where: { status: { in: ['PENDING', 'CONFIRMED'] } },
                        },
                    },
                },
            },
        });
        const capacityAlerts = slotsNearCapacity
            .filter((s) => s._count.bookings >= s.capacity * 0.8)
            .map((s) => ({
            type: 'capacity-warning',
            slotId: s.id,
            terminal: s.terminal.name,
            startTime: s.startTime,
            booked: s._count.bookings,
            capacity: s.capacity,
            utilization: Math.round((s._count.bookings / s.capacity) * 100),
        }));
        return {
            denials: recentDenials,
            capacityAlerts,
        };
    }
};
OperatorService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        EventsGateway])
], OperatorService);
export { OperatorService };
//# sourceMappingURL=operator.service.js.map