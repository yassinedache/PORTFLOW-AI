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
import { Controller, Get, Put, Param, Query, UseGuards, Request, } from '@nestjs/common';
import { NotificationService } from './notification.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
let NotificationController = class NotificationController {
    notificationService;
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async getNotifications(req, page, limit, unreadOnly) {
        return this.notificationService.getForUser(req.user.userId, {
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
            unreadOnly: unreadOnly === 'true',
        });
    }
    async getUnreadCount(req) {
        const count = await this.notificationService.getUnreadCount(req.user.userId);
        return { count };
    }
    async markAsRead(id, req) {
        await this.notificationService.markAsRead(id, req.user.userId);
        return { success: true };
    }
    async markAllAsRead(req) {
        await this.notificationService.markAllAsRead(req.user.userId);
        return { success: true };
    }
};
__decorate([
    Get(),
    Roles('PORT_ADMIN', 'TERMINAL_OPERATOR', 'CARRIER'),
    __param(0, Request()),
    __param(1, Query('page')),
    __param(2, Query('limit')),
    __param(3, Query('unreadOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getNotifications", null);
__decorate([
    Get('unread-count'),
    Roles('PORT_ADMIN', 'TERMINAL_OPERATOR', 'CARRIER'),
    __param(0, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getUnreadCount", null);
__decorate([
    Put(':id/read'),
    Roles('PORT_ADMIN', 'TERMINAL_OPERATOR', 'CARRIER'),
    __param(0, Param('id')),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAsRead", null);
__decorate([
    Put('mark-all-read'),
    Roles('PORT_ADMIN', 'TERMINAL_OPERATOR', 'CARRIER'),
    __param(0, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAllAsRead", null);
NotificationController = __decorate([
    Controller('notifications'),
    UseGuards(JwtAuthGuard, RolesGuard),
    __metadata("design:paramtypes", [NotificationService])
], NotificationController);
export { NotificationController };
//# sourceMappingURL=notification.controller.js.map