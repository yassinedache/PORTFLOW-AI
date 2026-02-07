var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from './common/decorators/public.decorator.js';
import { PrismaService } from './prisma/prisma.service.js';
let AppController = class AppController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async healthCheck() {
        let dbStatus = 'up';
        try {
            await this.prisma.$queryRawUnsafe('SELECT 1');
        }
        catch {
            dbStatus = 'down';
        }
        return {
            status: 'ok',
            service: 'PORTFLOW AI',
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            database: dbStatus,
        };
    }
};
__decorate([
    Public(),
    Get(),
    ApiOperation({ summary: 'Health check' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "healthCheck", null);
AppController = __decorate([
    ApiTags('Health'),
    Controller(),
    __metadata("design:paramtypes", [PrismaService])
], AppController);
export { AppController };
//# sourceMappingURL=app.controller.js.map