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
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ZoneService } from './zone.service.js';
import { CreateZoneDto, UpdateZoneDto } from './dto/create-zone.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';
let ZoneController = class ZoneController {
    zoneService;
    constructor(zoneService) {
        this.zoneService = zoneService;
    }
    create(dto) {
        return this.zoneService.create(dto);
    }
    findAll(terminalId) {
        return this.zoneService.findAll(terminalId);
    }
    findOne(id) {
        return this.zoneService.findOne(id);
    }
    update(id, dto) {
        return this.zoneService.update(id, dto);
    }
    remove(id) {
        return this.zoneService.remove(id);
    }
};
__decorate([
    Post(),
    Roles(Role.PORT_ADMIN),
    ApiOperation({ summary: 'Create a zone (Admin)' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateZoneDto]),
    __metadata("design:returntype", void 0)
], ZoneController.prototype, "create", null);
__decorate([
    Get(),
    Roles(Role.PORT_ADMIN, Role.TERMINAL_OPERATOR),
    ApiOperation({ summary: 'List all zones' }),
    ApiQuery({ name: 'terminalId', required: false }),
    __param(0, Query('terminalId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ZoneController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    Roles(Role.PORT_ADMIN, Role.TERMINAL_OPERATOR),
    ApiOperation({ summary: 'Get zone by ID' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ZoneController.prototype, "findOne", null);
__decorate([
    Put(':id'),
    Roles(Role.PORT_ADMIN),
    ApiOperation({ summary: 'Update a zone (Admin)' }),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateZoneDto]),
    __metadata("design:returntype", void 0)
], ZoneController.prototype, "update", null);
__decorate([
    Delete(':id'),
    Roles(Role.PORT_ADMIN),
    ApiOperation({ summary: 'Delete a zone (Admin)' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ZoneController.prototype, "remove", null);
ZoneController = __decorate([
    ApiTags('Admin - Zones'),
    ApiBearerAuth(),
    Controller('admin/zones'),
    UseGuards(RolesGuard),
    __metadata("design:paramtypes", [ZoneService])
], ZoneController);
export { ZoneController };
//# sourceMappingURL=zone.controller.js.map