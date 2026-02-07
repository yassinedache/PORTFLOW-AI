import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateZoneDto, UpdateZoneDto } from './dto/create-zone.dto.js';

@Injectable()
export class ZoneService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateZoneDto) {
    // Verify terminal exists
    const terminal = await this.prisma.terminal.findUnique({
      where: { id: dto.terminalId },
    });
    if (!terminal) throw new NotFoundException('Terminal not found');

    return this.prisma.zone.create({
      data: {
        name: dto.name,
        terminalId: dto.terminalId,
        type: dto.type || 'GENERAL',
        maxTrucks: dto.maxTrucks || 50,
      },
      include: {
        terminal: { select: { id: true, name: true } },
      },
    });
  }

  async findAll(terminalId?: string) {
    const where: any = {};
    if (terminalId) where.terminalId = terminalId;

    return this.prisma.zone.findMany({
      where,
      include: {
        terminal: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: string) {
    const zone = await this.prisma.zone.findUnique({
      where: { id },
      include: {
        terminal: { select: { id: true, name: true } },
      },
    });
    if (!zone) throw new NotFoundException('Zone not found');
    return zone;
  }

  async update(id: string, dto: UpdateZoneDto) {
    await this.findOne(id); // check exists

    return this.prisma.zone.update({
      where: { id },
      data: {
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.terminalId !== undefined && { terminalId: dto.terminalId }),
        ...(dto.type !== undefined && { type: dto.type }),
        ...(dto.maxTrucks !== undefined && { maxTrucks: dto.maxTrucks }),
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
      },
      include: {
        terminal: { select: { id: true, name: true } },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.zone.delete({ where: { id } });
    return { message: 'Zone deleted successfully' };
  }
}
