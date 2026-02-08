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
import { BlockchainService } from './blockchain.service.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';
let BlockchainController = class BlockchainController {
    blockchainService;
    constructor(blockchainService) {
        this.blockchainService = blockchainService;
    }
    createProof(body) {
        return this.blockchainService.createProof(body.entityType, body.entityId, body.payload);
    }
    verifyProof(entityType, entityId) {
        return this.blockchainService.verifyEntityProof(entityType, entityId);
    }
    getProofHistory(entityId) {
        return this.blockchainService.getProofHistory(entityId);
    }
};
__decorate([
    Post('proofs'),
    Roles(Role.TERMINAL_OPERATOR, Role.PORT_ADMIN),
    ApiOperation({ summary: 'Create a blockchain proof for an entity' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BlockchainController.prototype, "createProof", null);
__decorate([
    Get('verify/:entityType/:entityId'),
    Roles(Role.PORT_ADMIN, Role.TERMINAL_OPERATOR, Role.CARRIER, Role.GATE_AGENT),
    ApiOperation({ summary: 'Verify a blockchain proof for an entity' }),
    __param(0, Param('entityType')),
    __param(1, Param('entityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BlockchainController.prototype, "verifyProof", null);
__decorate([
    Get('proofs/:entityId'),
    Roles(Role.PORT_ADMIN, Role.TERMINAL_OPERATOR, Role.CARRIER, Role.GATE_AGENT),
    ApiOperation({ summary: 'Get proof history for an entity' }),
    __param(0, Param('entityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlockchainController.prototype, "getProofHistory", null);
BlockchainController = __decorate([
    ApiTags('Blockchain'),
    ApiBearerAuth(),
    Controller('blockchain'),
    UseGuards(RolesGuard),
    __metadata("design:paramtypes", [BlockchainService])
], BlockchainController);
export { BlockchainController };
//# sourceMappingURL=blockchain.controller.js.map