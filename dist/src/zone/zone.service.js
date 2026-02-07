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
let ZoneService = class ZoneService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const terminal = await this.prisma.terminal.findUnique({
            where: { id: dto.terminalId },
        });
        if (!terminal)
            throw new NotFoundException('Terminal not found');
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
    async findAll(terminalId) {
        const where = {};
        if (terminalId)
            where.terminalId = terminalId;
        return this.prisma.zone.findMany({
            where,
            include: {
                terminal: { select: { id: true, name: true } },
            },
            orderBy: { createdAt: 'asc' },
        });
    }
    async findOne(id) {
        const zone = await this.prisma.zone.findUnique({
            where: { id },
            include: {
                terminal: { select: { id: true, name: true } },
            },
        });
        if (!zone)
            throw new NotFoundException('Zone not found');
        return zone;
    }
    async update(id, dto) {
        await this.findOne(id);
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
    async remove(id) {
        await this.findOne(id);
        await this.prisma.zone.delete({ where: { id } });
        return { message: 'Zone deleted successfully' };
    }
};
ZoneService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ZoneService);
export { ZoneService };
//# sourceMappingURL=zone.service.js.map