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
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { GateAccessService } from './gate-access.service.js';
import { ScanQrDto } from './dto/scan.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { DeviceGuard } from '../common/guards/device.guard.js';
import { Role } from '../../generated/prisma/client.js';
let GateAccessController = class GateAccessController {
    gateAccessService;
    constructor(gateAccessService) {
        this.gateAccessService = gateAccessService;
    }
    scan(dto) {
        return this.gateAccessService.scan(dto);
    }
};
__decorate([
    Post('scan'),
    Roles(Role.GATE_AGENT),
    ApiOperation({ summary: 'Scan QR code at gate (Gate Agent)' }),
    ApiHeader({
        name: 'x-device-id',
        description: 'Device fingerprint for device-bound gate agent authentication',
        required: false,
    }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ScanQrDto]),
    __metadata("design:returntype", void 0)
], GateAccessController.prototype, "scan", null);
GateAccessController = __decorate([
    ApiTags('Gate Access'),
    ApiBearerAuth(),
    Controller('gate'),
    UseGuards(RolesGuard, DeviceGuard),
    __metadata("design:paramtypes", [GateAccessService])
], GateAccessController);
export { GateAccessController };
//# sourceMappingURL=gate-access.controller.js.map