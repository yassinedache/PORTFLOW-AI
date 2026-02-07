import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { QrService } from '../qr/qr.service.js';
import { BlockchainService } from '../blockchain/blockchain.service.js';
import { EventsGateway } from '../events/events.gateway.js';
import { ScanQrDto } from './dto/scan.dto.js';

@Injectable()
export class GateAccessService {
  private readonly logger = new Logger(GateAccessService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly qrService: QrService,
    private readonly blockchainService: BlockchainService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async scan(dto: ScanQrDto) {
    // Verify gate exists
    const gate = await this.prisma.gate.findUnique({
      where: { id: dto.gateId },
    });
    if (!gate || !gate.isActive) {
      return this.createLog(
        null,
        dto.gateId,
        'DENIED',
        'Gate not found or inactive',
      );
    }

    // Verify QR token
    const decoded = this.qrService.verifyToken(dto.qrToken);
    if (!decoded) {
      return this.createLog(
        null,
        dto.gateId,
        'DENIED',
        'Invalid or expired QR token',
      );
    }

    // Find booking
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

    // Check booking status — PRD requires READY_TO_GO
    if (booking.status !== 'READY_TO_GO') {
      return this.createLog(
        booking.id,
        dto.gateId,
        'DENIED',
        `Booking status is ${booking.status}, expected READY_TO_GO`,
      );
    }

    // Check gate belongs to booking's terminal
    if (gate.terminalId !== booking.terminalId) {
      return this.createLog(
        booking.id,
        dto.gateId,
        'DENIED',
        'Gate does not belong to booking terminal',
      );
    }

    // Check time window (allow 30 min before and after slot)
    const now = new Date();
    const slotStart = new Date(booking.timeSlot.startTime);
    const slotEnd = new Date(booking.timeSlot.endTime);
    const bufferMs = 30 * 60 * 1000;

    if (now < new Date(slotStart.getTime() - bufferMs)) {
      return this.createLog(
        booking.id,
        dto.gateId,
        'DENIED',
        'Too early - time slot has not started yet',
      );
    }

    if (now > new Date(slotEnd.getTime() + bufferMs)) {
      return this.createLog(
        booking.id,
        dto.gateId,
        'DENIED',
        'Too late - time slot has expired',
      );
    }

    // Verify blockchain proof — PRD requirement
    if (booking.blockchainHash) {
      const isValid = await this.blockchainService.verifyHash(
        {
          bookingId: booking.id,
          carrierId: booking.carrierId,
          terminalId: booking.terminalId,
          timeSlotId: booking.timeSlotId,
        },
        booking.blockchainHash,
      );
      if (!isValid) {
        return this.createLog(
          booking.id,
          dto.gateId,
          'DENIED',
          'Blockchain proof verification failed',
        );
      }
    }

    // Mark booking as consumed
    await this.prisma.booking.update({
      where: { id: booking.id },
      data: { status: 'CONSUMED' },
    });

    const result = await this.createLog(
      booking.id,
      dto.gateId,
      'ALLOWED',
      'Access granted',
    );

    // Emit events
    this.eventsGateway.emitBookingStatus(booking.id, 'CONSUMED');
    this.eventsGateway.emitQueueUpdate(booking.terminalId);
    this.eventsGateway.emitGateAccess({
      bookingId: booking.id,
      gateId: gate.id,
      gateName: gate.name,
      result: 'ALLOWED',
    });
    this.eventsGateway.emitPulseUpdate({
      type: 'gate-access',
      terminalId: booking.terminalId,
      gateName: gate.name,
      result: 'ALLOWED',
    });

    return result;
  }

  private async createLog(
    bookingId: string | null,
    gateId: string,
    result: 'ALLOWED' | 'DENIED',
    reason: string,
  ) {
    if (!bookingId) {
      // Can't create a log without a booking due to FK constraint, return inline
      this.logger.warn(`Gate access ${result}: ${reason} (no booking)`);
      return { result, reason, gateId, scannedAt: new Date() };
    }

    const log = await this.prisma.gateAccessLog.create({
      data: {
        bookingId,
        gateId,
        result: result as any,
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
}
