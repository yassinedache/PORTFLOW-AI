var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SlotsService } from './slots.service.js';
import { CreateTimeSlotDto } from './dto/create-slot.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';
let SlotsController = class SlotsController {
    slotsService;
    constructor(slotsService) {
        this.slotsService = slotsService;
    }
    create(dto) {
        return this.slotsService.create(dto);
    }
    createBulk(dtos) {
        return this.slotsService.createBulk(dtos);
    }
    getAvailability(terminalId, date) {
        return this.slotsService.getAvailability(terminalId, date);
    }
    getHeatmap(terminalId) {
        return this.slotsService.getHeatmap(terminalId);
    }
};
__decorate([
    Post(),
    Roles(Role.PORT_ADMIN),
    ApiOperation({ summary: 'Create a time slot (Admin)' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateTimeSlotDto]),
    __metadata("design:returntype", void 0)
], SlotsController.prototype, "create", null);
__decorate([
    Post('bulk'),
    Roles(Role.PORT_ADMIN),
    ApiOperation({ summary: 'Create multiple time slots (Admin)' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], SlotsController.prototype, "createBulk", null);
__decorate([
    Get('availability'),
    Roles(Role.PORT_ADMIN, Role.TERMINAL_OPERATOR, Role.CARRIER),
    ApiOperation({ summary: 'Get slot availability' }),
    ApiQuery({ name: 'terminalId', required: false }),
    ApiQuery({ name: 'date', required: false, description: 'YYYY-MM-DD' }),
    __param(0, Query('terminalId')),
    __param(1, Query('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SlotsController.prototype, "getAvailability", null);
__decorate([
    Get('heatmap'),
    Roles(Role.PORT_ADMIN, Role.TERMINAL_OPERATOR, Role.CARRIER),
    ApiOperation({ summary: 'Get booking heatmap (next 7 days)' }),
    ApiQuery({ name: 'terminalId', required: false }),
    __param(0, Query('terminalId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SlotsController.prototype, "getHeatmap", null);
SlotsController = __decorate([
    ApiTags('Slots & Availability'),
    ApiBearerAuth(),
    Controller('slots'),
    UseGuards(RolesGuard),
    __metadata("design:paramtypes", [SlotsService])
], SlotsController);
export { SlotsController };
//# sourceMappingURL=slots.controller.js.map