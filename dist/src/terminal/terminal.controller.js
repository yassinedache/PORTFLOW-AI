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
import { TerminalService } from './terminal.service.js';
import { CreateTerminalDto, UpdateTerminalDto } from './dto/create-terminal.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';
let TerminalController = class TerminalController {
    terminalService;
    constructor(terminalService) {
        this.terminalService = terminalService;
    }
    create(dto) {
        return this.terminalService.create(dto);
    }
    findAll() {
        return this.terminalService.findAll();
    }
    findOne(id) {
        return this.terminalService.findOne(id);
    }
    update(id, dto) {
        return this.terminalService.update(id, dto);
    }
    remove(id) {
        return this.terminalService.remove(id);
    }
};
__decorate([
    Post(),
    Roles(Role.PORT_ADMIN),
    ApiOperation({ summary: 'Create a new terminal' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateTerminalDto]),
    __metadata("design:returntype", void 0)
], TerminalController.prototype, "create", null);
__decorate([
    Get(),
    Roles(Role.PORT_ADMIN, Role.TERMINAL_OPERATOR, Role.CARRIER),
    ApiOperation({ summary: 'List all terminals' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TerminalController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    Roles(Role.PORT_ADMIN, Role.TERMINAL_OPERATOR, Role.CARRIER),
    ApiOperation({ summary: 'Get terminal by ID' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TerminalController.prototype, "findOne", null);
__decorate([
    Put(':id'),
    Roles(Role.PORT_ADMIN),
    ApiOperation({ summary: 'Update terminal' }),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateTerminalDto]),
    __metadata("design:returntype", void 0)
], TerminalController.prototype, "update", null);
__decorate([
    Delete(':id'),
    Roles(Role.PORT_ADMIN),
    ApiOperation({ summary: 'Delete terminal' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TerminalController.prototype, "remove", null);
TerminalController = __decorate([
    ApiTags('Admin - Terminals'),
    ApiBearerAuth(),
    Controller('admin/terminals'),
    UseGuards(RolesGuard),
    __metadata("design:paramtypes", [TerminalService])
], TerminalController);
export { TerminalController };
//# sourceMappingURL=terminal.controller.js.map