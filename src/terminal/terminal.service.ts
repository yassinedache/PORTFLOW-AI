import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTerminalDto, UpdateTerminalDto } from './dto/create-terminal.dto.js';

@Injectable()
export class TerminalService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTerminalDto) {
    return this.prisma.terminal.create({ data: dto });
  }

  async findAll() {
    return this.prisma.terminal.findMany({
      include: { gates: true, _count: { select: { bookings: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const terminal = await this.prisma.terminal.findUnique({
      where: { id },
      include: { gates: true, timeSlots: true },
    });
    if (!terminal) throw new NotFoundException('Terminal not found');
    return terminal;
  }

  async update(id: string, dto: UpdateTerminalDto) {
    await this.findOne(id);
    return this.prisma.terminal.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.terminal.delete({ where: { id } });
  }
}
