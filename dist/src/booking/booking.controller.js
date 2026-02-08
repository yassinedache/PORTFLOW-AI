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
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BookingService } from './booking.service.js';
import { CreateBookingDto, BookingActionDto, } from './dto/create-booking.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';
let BookingController = class BookingController {
    bookingService;
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    create(dto, user) {
        return this.bookingService.create(dto, user);
    }
    findMyBookings(userId) {
        return this.bookingService.findMyBookings(userId);
    }
    rescheduleOptions(id) {
        return this.bookingService.rescheduleOptions(id);
    }
    findOne(id) {
        return this.bookingService.findOne(id);
    }
    cancel(id, userId) {
        return this.bookingService.cancel(id, userId);
    }
    approve(id) {
        return this.bookingService.approve(id);
    }
    reject(id, dto) {
        return this.bookingService.reject(id, dto.reason);
    }
};
__decorate([
    Post('bookings'),
    Roles(Role.CARRIER),
    ApiOperation({ summary: 'Create a new booking (Carrier)' }),
    __param(0, Body()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateBookingDto, Object]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "create", null);
__decorate([
    Get('bookings/my'),
    Roles(Role.CARRIER),
    ApiOperation({ summary: 'Get my bookings (Carrier)' }),
    __param(0, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "findMyBookings", null);
__decorate([
    Get('bookings/:id/reschedule-options'),
    Roles(Role.CARRIER, Role.TERMINAL_OPERATOR),
    ApiOperation({
        summary: 'Get alternative time slots for rescheduling a booking',
    }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "rescheduleOptions", null);
__decorate([
    Get('bookings/:id'),
    Roles(Role.CARRIER, Role.TERMINAL_OPERATOR, Role.PORT_ADMIN),
    ApiOperation({ summary: 'Get booking by ID' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "findOne", null);
__decorate([
    Post('bookings/:id/cancel'),
    Roles(Role.CARRIER),
    ApiOperation({ summary: 'Cancel a booking (Carrier)' }),
    __param(0, Param('id')),
    __param(1, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "cancel", null);
__decorate([
    Post('operator/bookings/:id/approve'),
    Roles(Role.TERMINAL_OPERATOR),
    ApiOperation({ summary: 'Approve a booking (Operator)' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "approve", null);
__decorate([
    Post('operator/bookings/:id/reject'),
    Roles(Role.TERMINAL_OPERATOR),
    ApiOperation({ summary: 'Reject a booking (Operator)' }),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, BookingActionDto]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "reject", null);
BookingController = __decorate([
    ApiTags('Bookings'),
    ApiBearerAuth(),
    UseGuards(RolesGuard),
    Controller(),
    __metadata("design:paramtypes", [BookingService])
], BookingController);
export { BookingController };
//# sourceMappingURL=booking.controller.js.map