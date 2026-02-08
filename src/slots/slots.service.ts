import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTimeSlotDto } from './dto/create-slot.dto.js';

@Injectable()
export class SlotsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTimeSlotDto) {
    return this.prisma.timeSlot.create({
      data: {
        terminalId: dto.terminalId,
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
        capacity: dto.capacity,
      },
    });
  }

  async createBulk(slots: CreateTimeSlotDto[]) {
    return this.prisma.$transaction(
      slots.map((dto) =>
        this.prisma.timeSlot.create({
          data: {
            terminalId: dto.terminalId,
            startTime: new Date(dto.startTime),
            endTime: new Date(dto.endTime),
            capacity: dto.capacity,
          },
        }),
      ),
    );
  }

  async getAvailability(terminalId?: string, date?: string) {
    const where: any = {};

    if (terminalId) {
      where.terminalId = terminalId;
    }

    if (date) {
      const dayStart = new Date(`${date}T00:00:00Z`);
      const dayEnd = new Date(`${date}T23:59:59Z`);
      where.startTime = { gte: dayStart, lte: dayEnd };
    } else {
      // Default: show slots from now onwards
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

  async getHeatmap(terminalId?: string) {
    // Returns hourly booking density for the next 7 days
    const now = new Date();
    const weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const where: any = {
      startTime: { gte: now, lte: weekLater },
    };
    if (terminalId) where.terminalId = terminalId;

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
      utilization:
        slot.capacity > 0
          ? Math.round((slot._count.bookings / slot.capacity) * 100)
          : 0,
    }));
  }

  async findOne(id: string) {
    const slot = await this.prisma.timeSlot.findUnique({ where: { id } });
    if (!slot) throw new NotFoundException('Time slot not found');
    return slot;
  }
}
