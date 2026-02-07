import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateGateDto, UpdateGateDto } from './dto/create-gate.dto.js';

@Injectable()
export class GateService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGateDto) {
    return this.prisma.gate.create({
      data: {
        name: dto.name,
        terminalId: dto.terminalId,
        isActive: dto.isActive ?? true,
      },
    });
  }

  async findAll() {
    return this.prisma.gate.findMany({
      include: { terminal: { select: { id: true, name: true } } },
    });
  }

  async findOne(id: string) {
    const gate = await this.prisma.gate.findUnique({
      where: { id },
      include: { terminal: true },
    });
    if (!gate) throw new NotFoundException('Gate not found');
    return gate;
  }

  async update(id: string, dto: UpdateGateDto) {
    await this.findOne(id);
    return this.prisma.gate.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.gate.delete({ where: { id } });
  }
}
