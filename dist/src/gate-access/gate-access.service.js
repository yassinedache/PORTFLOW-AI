var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GateAccessService_1;
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { QrService } from '../qr/qr.service.js';
import { EventsGateway } from '../events/events.gateway.js';
let GateAccessService = GateAccessService_1 = class GateAccessService {
    prisma;
    qrService;
    eventsGateway;
    logger = new Logger(GateAccessService_1.name);
    constructor(prisma, qrService, eventsGateway) {
        this.prisma = prisma;
        this.qrService = qrService;
        this.eventsGateway = eventsGateway;
    }
    async scan(dto) {
        const gate = await this.prisma.gate.findUnique({
            where: { id: dto.gateId },
        });
        if (!gate || !gate.isActive) {
            return this.createLog(null, dto.gateId, 'DENIED', 'Gate not found or inactive');
        }
        const decoded = this.qrService.verifyToken(dto.qrToken);
        if (!decoded) {
            return this.createLog(null, dto.gateId, 'DENIED', 'Invalid or expired QR token');
        }
        const booking = await this.prisma.booking.findUnique({
            where: { id: decoded.bookingId },
            include: {
                timeSlot: true,
                terminal: true,
            },
        });
        if (!booking) {
            return this.createLog(null, dto.gateId, 'DENIED', 'Booking not found');
        }
        if (booking.status !== 'CONFIRMED') {
            return this.createLog(booking.id, dto.gateId, 'DENIED', `Booking status is ${booking.status}, expected CONFIRMED`);
        }
        if (gate.terminalId !== booking.terminalId) {
            return this.createLog(booking.id, dto.gateId, 'DENIED', 'Gate does not belong to booking terminal');
        }
        const now = new Date();
        const slotStart = new Date(booking.timeSlot.startTime);
        const slotEnd = new Date(booking.timeSlot.endTime);
        const bufferMs = 30 * 60 * 1000;
        if (now < new Date(slotStart.getTime() - bufferMs)) {
            return this.createLog(booking.id, dto.gateId, 'DENIED', 'Too early - time slot has not started yet');
        }
        if (now > new Date(slotEnd.getTime() + bufferMs)) {
            return this.createLog(booking.id, dto.gateId, 'DENIED', 'Too late - time slot has expired');
        }
        await this.prisma.booking.update({
            where: { id: booking.id },
            data: { status: 'CONSUMED' },
        });
        const result = await this.createLog(booking.id, dto.gateId, 'ALLOWED', 'Access granted');
        this.eventsGateway.emitBookingStatus(booking.id, 'CONSUMED');
        this.eventsGateway.emitQueueUpdate(booking.terminalId);
        this.eventsGateway.emitPulseUpdate({
            type: 'gate-access',
            terminalId: booking.terminalId,
            gateName: gate.name,
            result: 'ALLOWED',
        });
        return result;
    }
    async createLog(bookingId, gateId, result, reason) {
        if (!bookingId) {
            this.logger.warn(`Gate access ${result}: ${reason} (no booking)`);
            return { result, reason, gateId, scannedAt: new Date() };
        }
        const log = await this.prisma.gateAccessLog.create({
            data: {
                bookingId,
                gateId,
                result: result,
                reason,
            },
            include: {
                booking: {
                    select: { id: true, status: true, carrierId: true },
                },
                gate: {
                    select: { id: true, name: true },
                },
            },
        });
        return log;
    }
};
GateAccessService = GateAccessService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        QrService,
        EventsGateway])
], GateAccessService);
export { GateAccessService };
//# sourceMappingURL=gate-access.service.js.map