import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { BlockchainService } from '../blockchain/blockchain.service.js';
import { EventsGateway } from '../events/events.gateway.js';
import { CapacityOverrideDto } from './dto/capacity-override.dto.js';

@Injectable()
export class OperatorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly blockchainService: BlockchainService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async getQueue(terminalId?: string) {
    const where: any = { status: { in: ['PENDING', 'CONFIRMED'] } };
    if (terminalId) where.terminalId = terminalId;

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

  async overrideCapacity(dto: CapacityOverrideDto) {
    const slot = await this.prisma.timeSlot.findUnique({
      where: { id: dto.timeSlotId },
    });

    if (!slot) throw new NotFoundException('Time slot not found');

    const updated = await this.prisma.timeSlot.update({
      where: { id: dto.timeSlotId },
      data: { capacity: dto.newCapacity },
    });

    // Emit alert
    this.eventsGateway.emitAlert({
      type: 'capacity-override',
      message: `Capacity for slot ${slot.id} changed to ${dto.newCapacity}`,
      terminalId: slot.terminalId,
    });

    this.eventsGateway.emitQueueUpdate(slot.terminalId);

    return updated;
  }

  async getAlerts(terminalId?: string) {
    // Return recent gate denials and capacity warnings
    const recentDenials = await this.prisma.gateAccessLog.findMany({
      where: {
        result: 'DENIED',
        ...(terminalId ? { gate: { terminalId } } : {}),
      },
      include: {
        gate: { select: { name: true, terminalId: true } },
        booking: { select: { id: true, carrierId: true } },
      },
      orderBy: { scannedAt: 'desc' },
      take: 20,
    });

    // Slots nearing capacity
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

  // ─── Container Status Management ─────────────────────────────────────

  private static readonly VALID_TRANSITIONS: Record<string, string[]> = {
    NOT_ARRIVED: ['IN_YARD'],
    IN_YARD: ['READY'],
    READY: ['RELEASED'],
    RELEASED: [],
  };

  async updateContainerStatus(containerId: string, newStatus: string) {
    const container = await this.prisma.container.findUnique({
      where: { id: containerId },
    });
    if (!container) throw new NotFoundException('Container not found');

    const allowed = OperatorService.VALID_TRANSITIONS[container.status] || [];
    if (!allowed.includes(newStatus)) {
      throw new BadRequestException(
        `Invalid status transition: ${container.status} → ${newStatus}. Allowed: ${allowed.join(', ') || 'none'}`,
      );
    }

    const updated = await this.prisma.container.update({
      where: { id: containerId },
      data: { status: newStatus as any, lastUpdatedAt: new Date() },
    });

    this.eventsGateway.emitPulseUpdate({
      type: 'container-status',
      containerId,
      oldStatus: container.status,
      newStatus,
    });

    return updated;
  }

  // ─── Confirm Readiness ───────────────────────────────────────────────

  async confirmReadiness(bookingId: string, userId?: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { container: true },
    });
    if (!booking) throw new NotFoundException('Booking not found');

    if (booking.status !== 'CONFIRMED') {
      throw new BadRequestException(
        `Cannot confirm readiness for booking with status: ${booking.status}. Must be CONFIRMED.`,
      );
    }

    // Verify container is READY (if linked)
    if (booking.container && booking.container.status !== 'READY') {
      throw new BadRequestException(
        `Container status is ${booking.container.status}, expected READY`,
      );
    }

    // Generate/update blockchain hash for readiness proof
    const blockchainHash = await this.blockchainService.hashBooking({
      bookingId: booking.id,
      carrierId: booking.carrierId,
      terminalId: booking.terminalId,
      timeSlotId: booking.timeSlotId,
    });

    const updated = await this.prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'READY_TO_GO',
        blockchainHash,
        readinessScore: 1.0,
      },
      include: {
        terminal: { select: { name: true } },
        timeSlot: { select: { startTime: true, endTime: true } },
      },
    });

    // Create ReadinessProof record for audit trail
    await this.prisma.readinessProof.create({
      data: {
        bookingId,
        containerId: booking.containerId,
        confirmedBy: userId || booking.carrierId,
        blockchainHash,
      },
    });

    // Emit events
    this.eventsGateway.emitBookingStatus(bookingId, 'READY_TO_GO');
    this.eventsGateway.emitBookingReady(bookingId, {
      terminal: updated.terminal?.name,
      slot: updated.timeSlot,
    });

    return updated;
  }
}
