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
import { OperatorService } from './operator.service.js';
import { CapacityOverrideDto } from './dto/capacity-override.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';
let OperatorController = class OperatorController {
    operatorService;
    constructor(operatorService) {
        this.operatorService = operatorService;
    }
    getQueue(terminalId) {
        return this.operatorService.getQueue(terminalId);
    }
    overrideCapacity(dto) {
        return this.operatorService.overrideCapacity(dto);
    }
    getAlerts(terminalId) {
        return this.operatorService.getAlerts(terminalId);
    }
};
__decorate([
    Get('queue'),
    Roles(Role.TERMINAL_OPERATOR, Role.PORT_ADMIN),
    ApiOperation({ summary: 'Get booking queue for operators' }),
    ApiQuery({ name: 'terminalId', required: false }),
    __param(0, Query('terminalId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OperatorController.prototype, "getQueue", null);
__decorate([
    Post('capacity/override'),
    Roles(Role.TERMINAL_OPERATOR, Role.PORT_ADMIN),
    ApiOperation({ summary: 'Override time slot capacity' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CapacityOverrideDto]),
    __metadata("design:returntype", void 0)
], OperatorController.prototype, "overrideCapacity", null);
__decorate([
    Get('alerts'),
    Roles(Role.TERMINAL_OPERATOR, Role.PORT_ADMIN),
    ApiOperation({ summary: 'Get operator alerts (denials, capacity warnings)' }),
    ApiQuery({ name: 'terminalId', required: false }),
    __param(0, Query('terminalId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OperatorController.prototype, "getAlerts", null);
OperatorController = __decorate([
    ApiTags('Operator Control Room'),
    ApiBearerAuth(),
    Controller('operator'),
    UseGuards(RolesGuard),
    __metadata("design:paramtypes", [OperatorService])
], OperatorController);
export { OperatorController };
//# sourceMappingURL=operator.controller.js.map