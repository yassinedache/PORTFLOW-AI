import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BookingService } from './booking.service.js';
import {
  CreateBookingDto,
  BookingActionDto,
} from './dto/create-booking.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';
import type { RequestUser } from '../common/interfaces/jwt-payload.interface.js';

@ApiTags('Bookings')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // ─── Carrier Endpoints ───────────────────────────────────────────────

  @Post('bookings')
  @Roles(Role.CARRIER)
  @ApiOperation({ summary: 'Create a new booking (Carrier)' })
  create(@Body() dto: CreateBookingDto, @CurrentUser() user: RequestUser) {
    return this.bookingService.create(dto, user);
  }

  @Get('bookings/my')
  @Roles(Role.CARRIER)
  @ApiOperation({ summary: 'Get my bookings (Carrier)' })
  findMyBookings(@CurrentUser('id') userId: string) {
    return this.bookingService.findMyBookings(userId);
  }

  @Get('bookings/:id/reschedule-options')
  @Roles(Role.CARRIER, Role.TERMINAL_OPERATOR)
  @ApiOperation({
    summary: 'Get alternative time slots for rescheduling a booking',
  })
  rescheduleOptions(@Param('id') id: string) {
    return this.bookingService.rescheduleOptions(id);
  }

  @Get('bookings/:id')
  @Roles(Role.CARRIER, Role.TERMINAL_OPERATOR, Role.PORT_ADMIN)
  @ApiOperation({ summary: 'Get booking by ID' })
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Post('bookings/:id/cancel')
  @Roles(Role.CARRIER)
  @ApiOperation({ summary: 'Cancel a booking (Carrier)' })
  cancel(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.bookingService.cancel(id, userId);
  }

  // ─── Operator Endpoints ──────────────────────────────────────────────

  @Post('operator/bookings/:id/approve')
  @Roles(Role.TERMINAL_OPERATOR)
  @ApiOperation({ summary: 'Approve a booking (Operator)' })
  approve(@Param('id') id: string) {
    return this.bookingService.approve(id);
  }

  @Post('operator/bookings/:id/reject')
  @Roles(Role.TERMINAL_OPERATOR)
  @ApiOperation({ summary: 'Reject a booking (Operator)' })
  reject(@Param('id') id: string, @Body() dto: BookingActionDto) {
    return this.bookingService.reject(id, dto.reason);
  }
}
