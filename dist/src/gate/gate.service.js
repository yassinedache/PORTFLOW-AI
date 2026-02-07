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
let GateService = class GateService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
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
    async findOne(id) {
        const gate = await this.prisma.gate.findUnique({
            where: { id },
            include: { terminal: true },
        });
        if (!gate)
            throw new NotFoundException('Gate not found');
        return gate;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.gate.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.gate.delete({ where: { id } });
    }
};
GateService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], GateService);
export { GateService };
//# sourceMappingURL=gate.service.js.map