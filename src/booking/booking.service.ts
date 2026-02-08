import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBookingDto } from './dto/create-booking.dto.js';
import { BlockchainService } from '../blockchain/blockchain.service.js';
import { QrService } from '../qr/qr.service.js';
import { EventsGateway } from '../events/events.gateway.js';
import { NotificationService } from '../notification/notification.service.js';
import { RequestUser } from '../common/interfaces/jwt-payload.interface.js';

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly blockchainService: BlockchainService,
    private readonly qrService: QrService,
    private readonly eventsGateway: EventsGateway,
    private readonly notificationService: NotificationService,
  ) {}

  async create(dto: CreateBookingDto, user: RequestUser) {
    // Check idempotency
    if (dto.idempotencyKey) {
      const existing = await this.prisma.booking.findUnique({
        where: { idempotencyKey: dto.idempotencyKey },
      });
      if (existing) return existing;
    }

    // Verify time slot exists and has capacity
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
      throw new BadRequestException(
        'Time slot does not belong to specified terminal',
      );
    }

    if (timeSlot._count.bookings >= timeSlot.capacity) {
      throw new ConflictException('Time slot is fully booked');
    }

    // Check time slot is in the future
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
        carrier: { select: { email: true } },
      },
    });

    // Emit real-time update
    this.eventsGateway.emitBookingStatus(booking.id, 'PENDING');
    this.eventsGateway.emitQueueUpdate(dto.terminalId);

    // Notify operators of new pending booking
    await this.notificationService.notifyOperatorsOfPendingBooking({
      id: booking.id,
      carrier: { email: booking.carrier.email },
      terminal: { name: booking.terminal.name },
      timeSlot: { start: booking.timeSlot.startTime },
    });

    return booking;
  }

  async findMyBookings(userId: string) {
    return this.prisma.booking.findMany({
      where: { carrierId: userId },
      include: {
        terminal: { select: { id: true, name: true } },
        timeSlot: { select: { startTime: true, endTime: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
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
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async cancel(id: string, userId: string) {
    const booking = await this.findOne(id);

    if (booking.carrierId !== userId) {
      throw new ForbiddenException('You can only cancel your own bookings');
    }

    if (!['PENDING', 'CONFIRMED'].includes(booking.status)) {
      throw new BadRequestException(
        `Cannot cancel booking with status: ${booking.status}`,
      );
    }

    const updated = await this.prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    this.eventsGateway.emitBookingStatus(id, 'CANCELLED');
    this.eventsGateway.emitQueueUpdate(booking.terminalId);

    return updated;
  }

  async approve(id: string) {
    const booking = await this.findOne(id);

    if (booking.status !== 'PENDING') {
      throw new BadRequestException(
        `Cannot approve booking with status: ${booking.status}`,
      );
    }

    // Generate QR token
    const qrToken = this.qrService.generateBookingToken(booking.id);

    // Generate blockchain hash
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

    // Persist blockchain proof record for audit trail
    await this.blockchainService.createProof('BOOKING', booking.id, {
      bookingId: booking.id,
      carrierId: booking.carrierId,
      terminalId: booking.terminalId,
      timeSlotId: booking.timeSlotId,
    });

    // Generate QR code data URL for immediate use
    const qrDataUrl = await this.qrService.generateQrDataUrl(qrToken);

    this.eventsGateway.emitBookingStatus(id, 'CONFIRMED');
    this.eventsGateway.emitQueueUpdate(booking.terminalId);

    // Notify carrier of approval
    await this.notificationService.notifyCarrierOfApproval({
      id: booking.id,
      carrierId: booking.carrierId,
      terminal: { name: booking.terminal.name },
      timeSlot: { start: booking.timeSlot.startTime },
    });

    return { ...updated, qrDataUrl };
  }

  async reject(id: string, reason?: string) {
    const booking = await this.findOne(id);

    if (booking.status !== 'PENDING') {
      throw new BadRequestException(
        `Cannot reject booking with status: ${booking.status}`,
      );
    }

    const updated = await this.prisma.booking.update({
      where: { id },
      data: { status: 'REJECTED' },
    });

    this.eventsGateway.emitBookingStatus(id, 'REJECTED');
    this.eventsGateway.emitQueueUpdate(booking.terminalId);

    // Notify carrier of rejection
    await this.notificationService.notifyCarrierOfRejection(
      {
        id: booking.id,
        carrierId: booking.carrierId,
        terminal: { name: booking.terminal.name },
        timeSlot: { start: booking.timeSlot.startTime },
      },
      reason,
    );

    return { ...updated, rejectionReason: reason };
  }

  async rescheduleOptions(id: string) {
    const booking = await this.findOne(id);

    if (
      !['PENDING', 'CONFIRMED', 'AT_RISK', 'READY_TO_GO'].includes(
        booking.status,
      )
    ) {
      throw new BadRequestException(
        `Cannot reschedule booking with status: ${booking.status}`,
      );
    }

    // Find alternative slots in the same terminal with available capacity
    const now = new Date();
    const slots = await this.prisma.timeSlot.findMany({
      where: {
        terminalId: booking.terminalId,
        startTime: { gte: now },
        id: { not: booking.timeSlotId }, // exclude current slot
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

  async getOperatorQueue(terminalId?: string) {
    const where: any = { status: 'PENDING' };
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
}
