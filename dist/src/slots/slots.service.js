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
let SlotsService = class SlotsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.timeSlot.create({
            data: {
                terminalId: dto.terminalId,
                startTime: new Date(dto.startTime),
                endTime: new Date(dto.endTime),
                capacity: dto.capacity,
            },
        });
    }
    async createBulk(slots) {
        return this.prisma.$transaction(slots.map((dto) => this.prisma.timeSlot.create({
            data: {
                terminalId: dto.terminalId,
                startTime: new Date(dto.startTime),
                endTime: new Date(dto.endTime),
                capacity: dto.capacity,
            },
        })));
    }
    async getAvailability(terminalId, date) {
        const where = {};
        if (terminalId) {
            where.terminalId = terminalId;
        }
        if (date) {
            const dayStart = new Date(`${date}T00:00:00Z`);
            const dayEnd = new Date(`${date}T23:59:59Z`);
            where.startTime = { gte: dayStart, lte: dayEnd };
        }
        else {
            where.startTime = { gte: new Date() };
        }
        const slots = await this.prisma.timeSlot.findMany({
            where,
            include: {
                terminal: { select: { id: true, name: true } },
                _count: {
                    select: {
                        bookings: {
                            where: { status: { in: ['PENDING', 'CONFIRMED'] } },
                        },
                    },
                },
            },
            orderBy: { startTime: 'asc' },
        });
        return slots.map((slot) => ({
            id: slot.id,
            terminalId: slot.terminalId,
            terminalName: slot.terminal.name,
            startTime: slot.startTime,
            endTime: slot.endTime,
            capacity: slot.capacity,
            bookedCount: slot._count.bookings,
            availableCount: slot.capacity - slot._count.bookings,
        }));
    }
    async getHeatmap(terminalId) {
        const now = new Date();
        const weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const where = {
            startTime: { gte: now, lte: weekLater },
        };
        if (terminalId)
            where.terminalId = terminalId;
        const slots = await this.prisma.timeSlot.findMany({
            where,
            include: {
                _count: {
                    select: {
                        bookings: {
                            where: { status: { in: ['PENDING', 'CONFIRMED'] } },
                        },
                    },
                },
            },
            orderBy: { startTime: 'asc' },
        });
        return slots.map((slot) => ({
            slotId: slot.id,
            terminalId: slot.terminalId,
            startTime: slot.startTime,
            endTime: slot.endTime,
            capacity: slot.capacity,
            booked: slot._count.bookings,
            utilization: slot.capacity > 0
                ? Math.round((slot._count.bookings / slot.capacity) * 100)
                : 0,
        }));
    }
    async findOne(id) {
        const slot = await this.prisma.timeSlot.findUnique({ where: { id } });
        if (!slot)
            throw new NotFoundException('Time slot not found');
        return slot;
    }
};
SlotsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], SlotsService);
export { SlotsService };
//# sourceMappingURL=slots.service.js.map