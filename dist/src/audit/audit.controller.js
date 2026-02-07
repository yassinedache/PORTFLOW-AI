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
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuditService } from './audit.service.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';
let AuditController = class AuditController {
    auditService;
    constructor(auditService) {
        this.auditService = auditService;
    }
    getAuditLogs(page, limit, userId, entity, action) {
        return this.auditService.getAuditLogs({
            page: page ? parseInt(page) : undefined,
            limit: limit ? parseInt(limit) : undefined,
            userId,
            entity,
            action,
        });
    }
    getWaitingTimeAnalytics(terminalId, days) {
        return this.auditService.getWaitingTimeAnalytics(terminalId, days ? parseInt(days) : undefined);
    }
};
__decorate([
    Get('audit-logs'),
    Roles(Role.PORT_ADMIN),
    ApiOperation({ summary: 'Get audit logs (Admin)' }),
    ApiQuery({ name: 'page', required: false, type: Number }),
    ApiQuery({ name: 'limit', required: false, type: Number }),
    ApiQuery({ name: 'userId', required: false }),
    ApiQuery({ name: 'entity', required: false }),
    ApiQuery({ name: 'action', required: false }),
    __param(0, Query('page')),
    __param(1, Query('limit')),
    __param(2, Query('userId')),
    __param(3, Query('entity')),
    __param(4, Query('action')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], AuditController.prototype, "getAuditLogs", null);
__decorate([
    Get('analytics/waiting-time'),
    Roles(Role.PORT_ADMIN),
    ApiOperation({ summary: 'Get waiting time analytics (Admin)' }),
    ApiQuery({ name: 'terminalId', required: false }),
    ApiQuery({ name: 'days', required: false, type: Number }),
    __param(0, Query('terminalId')),
    __param(1, Query('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AuditController.prototype, "getWaitingTimeAnalytics", null);
AuditController = __decorate([
    ApiTags('Admin - Audit & Analytics'),
    ApiBearerAuth(),
    Controller('admin'),
    UseGuards(RolesGuard),
    __metadata("design:paramtypes", [AuditService])
], AuditController);
export { AuditController };
//# sourceMappingURL=audit.controller.js.map