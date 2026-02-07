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
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GateService } from './gate.service.js';
import { CreateGateDto, UpdateGateDto } from './dto/create-gate.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';
let GateController = class GateController {
    gateService;
    constructor(gateService) {
        this.gateService = gateService;
    }
    create(dto) {
        return this.gateService.create(dto);
    }
    findAll() {
        return this.gateService.findAll();
    }
    findOne(id) {
        return this.gateService.findOne(id);
    }
    update(id, dto) {
        return this.gateService.update(id, dto);
    }
    remove(id) {
        return this.gateService.remove(id);
    }
};
__decorate([
    Post(),
    Roles(Role.PORT_ADMIN),
    ApiOperation({ summary: 'Create a new gate' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateGateDto]),
    __metadata("design:returntype", void 0)
], GateController.prototype, "create", null);
__decorate([
    Get(),
    Roles(Role.PORT_ADMIN),
    ApiOperation({ summary: 'List all gates' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GateController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    Roles(Role.PORT_ADMIN),
    ApiOperation({ summary: 'Get gate by ID' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GateController.prototype, "findOne", null);
__decorate([
    Put(':id'),
    Roles(Role.PORT_ADMIN),
    ApiOperation({ summary: 'Update gate' }),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateGateDto]),
    __metadata("design:returntype", void 0)
], GateController.prototype, "update", null);
__decorate([
    Delete(':id'),
    Roles(Role.PORT_ADMIN),
    ApiOperation({ summary: 'Delete gate' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GateController.prototype, "remove", null);
GateController = __decorate([
    ApiTags('Admin - Gates'),
    ApiBearerAuth(),
    Controller('admin/gates'),
    UseGuards(RolesGuard),
    __metadata("design:paramtypes", [GateService])
], GateController);
export { GateController };
//# sourceMappingURL=gate.controller.js.map