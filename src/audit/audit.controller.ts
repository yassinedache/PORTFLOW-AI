import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuditService } from './audit.service.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';

@ApiTags('Admin - Audit & Analytics')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(RolesGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get('audit-logs')
  @Roles(Role.PORT_ADMIN)
  @ApiOperation({ summary: 'Get audit logs (Admin)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({ name: 'entity', required: false })
  @ApiQuery({ name: 'action', required: false })
  getAuditLogs(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('userId') userId?: string,
    @Query('entity') entity?: string,
    @Query('action') action?: string,
  ) {
    return this.auditService.getAuditLogs({
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
      userId,
      entity,
      action,
    });
  }

  @Get('analytics/waiting-time')
  @Roles(Role.PORT_ADMIN)
  @ApiOperation({ summary: 'Get waiting time analytics (Admin)' })
  @ApiQuery({ name: 'terminalId', required: false })
  @ApiQuery({ name: 'days', required: false, type: Number })
  getWaitingTimeAnalytics(
    @Query('terminalId') terminalId?: string,
    @Query('days') days?: string,
  ) {
    return this.auditService.getWaitingTimeAnalytics(
      terminalId,
      days ? parseInt(days) : undefined,
    );
  }
}
