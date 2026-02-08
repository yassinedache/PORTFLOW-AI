import {
  Controller,
  Get,
  Put,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NotificationService } from './notification.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@Controller('notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @Roles('PORT_ADMIN', 'TERMINAL_OPERATOR', 'CARRIER')
  async getNotifications(
    @Request() req,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('unreadOnly') unreadOnly?: string,
  ) {
    return this.notificationService.getForUser(req.user.userId, {
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
      unreadOnly: unreadOnly === 'true',
    });
  }

  @Get('unread-count')
  @Roles('PORT_ADMIN', 'TERMINAL_OPERATOR', 'CARRIER')
  async getUnreadCount(@Request() req) {
    const count = await this.notificationService.getUnreadCount(
      req.user.userId,
    );
    return { count };
  }

  @Put(':id/read')
  @Roles('PORT_ADMIN', 'TERMINAL_OPERATOR', 'CARRIER')
  async markAsRead(@Param('id') id: string, @Request() req) {
    await this.notificationService.markAsRead(id, req.user.userId);
    return { success: true };
  }

  @Put('mark-all-read')
  @Roles('PORT_ADMIN', 'TERMINAL_OPERATOR', 'CARRIER')
  async markAllAsRead(@Request() req) {
    await this.notificationService.markAllAsRead(req.user.userId);
    return { success: true };
  }
}
