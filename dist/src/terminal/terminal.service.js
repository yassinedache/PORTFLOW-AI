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
let TerminalService = class TerminalService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.terminal.create({ data: dto });
    }
    async findAll() {
        return this.prisma.terminal.findMany({
            include: { gates: true, _count: { select: { bookings: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const terminal = await this.prisma.terminal.findUnique({
            where: { id },
            include: { gates: true, timeSlots: true },
        });
        if (!terminal)
            throw new NotFoundException('Terminal not found');
        return terminal;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.terminal.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.terminal.delete({ where: { id } });
    }
};
TerminalService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], TerminalService);
export { TerminalService };
//# sourceMappingURL=terminal.service.js.map