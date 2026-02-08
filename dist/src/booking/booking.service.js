var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, BadRequestException, ConflictException, ForbiddenException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { BlockchainService } from '../blockchain/blockchain.service.js';
import { QrService } from '../qr/qr.service.js';
import { EventsGateway } from '../events/events.gateway.js';
let BookingService = class BookingService {
    prisma;
    blockchainService;
    qrService;
    eventsGateway;
    constructor(prisma, blockchainService, qrService, eventsGateway) {
        this.prisma = prisma;
        this.blockchainService = blockchainService;
        this.qrService = qrService;
        this.eventsGateway = eventsGateway;
    }
    async create(dto, user) {
        if (dto.idempotencyKey) {
            const existing = await this.prisma.booking.findUnique({
                where: { idempotencyKey: dto.idempotencyKey },
            });
            if (existing)
                return existing;
        }
        const timeSlot = await this.prisma.timeSlot.findUnique({
            where: { id: dto.timeSlotId },
            include: {
                _count: {
                    select: {
                        bookings: {
                            where: { status: { in: ['PENDING', 'CONFIRMED'] } },
                        },
                    },
                },
            },
        });
        if (!timeSlot) {
            throw new NotFoundException('Time slot not found');
        }
        if (timeSlot.terminalId !== dto.terminalId) {
            throw new BadRequestException('Time slot does not belong to specified terminal');
        }
        if (timeSlot._count.bookings >= timeSlot.capacity) {
            throw new ConflictException('Time slot is fully booked');
        }
        if (new Date(timeSlot.startTime) < new Date()) {
            throw new BadRequestException('Cannot book a past time slot');
        }
        const booking = await this.prisma.booking.create({
            data: {
                carrierId: user.id,
                terminalId: dto.terminalId,
                timeSlotId: dto.timeSlotId,
                truckId: dto.truckId || null,
                containerId: dto.containerId,
                price: dto.price || null,
                idempotencyKey: dto.idempotencyKey || null,
                status: 'PENDING',
            },
            include: {
                terminal: { select: { name: true } },
                timeSlot: { select: { startTime: true, endTime: true } },
            },
        });
        this.eventsGateway.emitBookingStatus(booking.id, 'PENDING');
        this.eventsGateway.emitQueueUpdate(dto.terminalId);
        return booking;
    }
    async findMyBookings(userId) {
        return this.prisma.booking.findMany({
            where: { carrierId: userId },
            include: {
                terminal: { select: { id: true, name: true } },
                timeSlot: { select: { startTime: true, endTime: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: {
                terminal: true,
                timeSlot: true,
                carrier: { select: { id: true, email: true } },
                truck: true,
                container: true,
            },
        });
        if (!booking)
            throw new NotFoundException('Booking not found');
        return booking;
    }
    async cancel(id, userId) {
        const booking = await this.findOne(id);
        if (booking.carrierId !== userId) {
            throw new ForbiddenException('You can only cancel your own bookings');
        }
        if (!['PENDING', 'CONFIRMED'].includes(booking.status)) {
            throw new BadRequestException(`Cannot cancel booking with status: ${booking.status}`);
        }
        const updated = await this.prisma.booking.update({
            where: { id },
            data: { status: 'CANCELLED' },
        });
        this.eventsGateway.emitBookingStatus(id, 'CANCELLED');
        this.eventsGateway.emitQueueUpdate(booking.terminalId);
        return updated;
    }
    async approve(id) {
        const booking = await this.findOne(id);
        if (booking.status !== 'PENDING') {
            throw new BadRequestException(`Cannot approve booking with status: ${booking.status}`);
        }
        const qrToken = this.qrService.generateBookingToken(booking.id);
        const blockchainHash = await this.blockchainService.hashBooking({
            bookingId: booking.id,
            carrierId: booking.carrierId,
            terminalId: booking.terminalId,
            timeSlotId: booking.timeSlotId,
        });
        const updated = await this.prisma.booking.update({
            where: { id },
            data: {
                status: 'CONFIRMED',
                qrToken,
                blockchainHash,
                validatedAt: new Date(),
            },
        });
        await this.blockchainService.createProof('BOOKING', booking.id, {
            bookingId: booking.id,
            carrierId: booking.carrierId,
            terminalId: booking.terminalId,
            timeSlotId: booking.timeSlotId,
        });
        const qrDataUrl = await this.qrService.generateQrDataUrl(qrToken);
        this.eventsGateway.emitBookingStatus(id, 'CONFIRMED');
        this.eventsGateway.emitQueueUpdate(booking.terminalId);
        return { ...updated, qrDataUrl };
    }
    async reject(id, reason) {
        const booking = await this.findOne(id);
        if (booking.status !== 'PENDING') {
            throw new BadRequestException(`Cannot reject booking with status: ${booking.status}`);
        }
        const updated = await this.prisma.booking.update({
            where: { id },
            data: { status: 'REJECTED' },
        });
        this.eventsGateway.emitBookingStatus(id, 'REJECTED');
        this.eventsGateway.emitQueueUpdate(booking.terminalId);
        return { ...updated, rejectionReason: reason };
    }
    async rescheduleOptions(id) {
        const booking = await this.findOne(id);
        if (!['PENDING', 'CONFIRMED', 'AT_RISK', 'READY_TO_GO'].includes(booking.status)) {
            throw new BadRequestException(`Cannot reschedule booking with status: ${booking.status}`);
        }
        const now = new Date();
        const slots = await this.prisma.timeSlot.findMany({
            where: {
                terminalId: booking.terminalId,
                startTime: { gte: now },
                id: { not: booking.timeSlotId },
            },
            include: {
                _count: {
                    select: {
                        bookings: {
                            where: {
                                status: { in: ['PENDING', 'CONFIRMED', 'READY_TO_GO'] },
                            },
                        },
                    },
                },
            },
            orderBy: { startTime: 'asc' },
            take: 10,
        });
        return slots
            .filter((s) => s._count.bookings < s.capacity)
            .map((s) => ({
            slotId: s.id,
            startTime: s.startTime,
            endTime: s.endTime,
            availableCapacity: s.capacity - s._count.bookings,
            totalCapacity: s.capacity,
        }));
    }
    async getOperatorQueue(terminalId) {
        const where = { status: 'PENDING' };
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
};
BookingService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        BlockchainService,
        QrService,
        EventsGateway])
], BookingService);
export { BookingService };
//# sourceMappingURL=booking.service.js.map