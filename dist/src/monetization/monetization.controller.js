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
import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MonetizationService } from './monetization.service.js';
import { EnablePriorityDto, ApplyPenaltyDto } from './dto/monetization.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';
let MonetizationController = class MonetizationController {
    monetizationService;
    constructor(monetizationService) {
        this.monetizationService = monetizationService;
    }
    getSlotPricing(slotId) {
        return this.monetizationService.getSlotPricing(slotId);
    }
    enablePriority(bookingId, dto) {
        return this.monetizationService.enablePriority(bookingId, dto.level);
    }
    applyPenalty(bookingId, dto) {
        return this.monetizationService.applyPenalty(bookingId, dto.type, dto.amount, dto.minutesLate);
    }
    getCharges(bookingId) {
        return this.monetizationService.getCharges(bookingId);
    }
};
__decorate([
    Get('slots/:id/pricing'),
    Roles(Role.PORT_ADMIN, Role.TERMINAL_OPERATOR, Role.CARRIER),
    ApiOperation({
        summary: 'Get dynamic pricing for a time slot',
        description: 'Calculates price based on congestion, demand, time of day, and eco-slot status. Deterministic and auditable.',
    }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MonetizationController.prototype, "getSlotPricing", null);
__decorate([
    Post('bookings/:id/priority'),
    Roles(Role.CARRIER),
    ApiOperation({
        summary: 'Enable priority access for a booking',
        description: 'Adds priority access (+30 units). Benefits: faster gate processing, protected from auto-reschedule.',
    }),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, EnablePriorityDto]),
    __metadata("design:returntype", void 0)
], MonetizationController.prototype, "enablePriority", null);
__decorate([
    Post('bookings/:id/penalty'),
    Roles(Role.TERMINAL_OPERATOR, Role.PORT_ADMIN),
    ApiOperation({
        summary: 'Apply no-show or late penalty to a booking',
        description: 'Auto-calculates penalty based on rules: NO_SHOW=50%, LATE>15min=20%, LATE>30min=40%. Custom amount supported.',
    }),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ApplyPenaltyDto]),
    __metadata("design:returntype", void 0)
], MonetizationController.prototype, "applyPenalty", null);
__decorate([
    Get('bookings/:id/charges'),
    Roles(Role.PORT_ADMIN, Role.TERMINAL_OPERATOR, Role.CARRIER),
    ApiOperation({
        summary: 'View total charges breakdown for a booking',
        description: 'Returns base price, dynamic pricing adjustment, priority fee, penalties, and total charges.',
    }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MonetizationController.prototype, "getCharges", null);
MonetizationController = __decorate([
    ApiTags('Monetization'),
    ApiBearerAuth(),
    UseGuards(RolesGuard),
    Controller(),
    __metadata("design:paramtypes", [MonetizationService])
], MonetizationController);
export { MonetizationController };
//# sourceMappingURL=monetization.controller.js.map