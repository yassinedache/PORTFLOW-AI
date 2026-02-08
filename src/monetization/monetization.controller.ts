import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MonetizationService } from './monetization.service.js';
import { EnablePriorityDto, ApplyPenaltyDto } from './dto/monetization.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';

@ApiTags('Monetization')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller()
export class MonetizationController {
  constructor(private readonly monetizationService: MonetizationService) {}

  // ─── Dynamic Pricing ─────────────────────────────────────────────────

  @Get('slots/:id/pricing')
  @Roles(Role.PORT_ADMIN, Role.TERMINAL_OPERATOR, Role.CARRIER)
  @ApiOperation({
    summary: 'Get dynamic pricing for a time slot',
    description:
      'Calculates price based on congestion, demand, time of day, and eco-slot status. Deterministic and auditable.',
  })
  getSlotPricing(@Param('id') slotId: string) {
    return this.monetizationService.getSlotPricing(slotId);
  }

  // ─── Priority Access ─────────────────────────────────────────────────

  @Post('bookings/:id/priority')
  @Roles(Role.CARRIER)
  @ApiOperation({
    summary: 'Enable priority access for a booking',
    description:
      'Adds priority access (+30 units). Benefits: faster gate processing, protected from auto-reschedule.',
  })
  enablePriority(
    @Param('id') bookingId: string,
    @Body() dto: EnablePriorityDto,
  ) {
    return this.monetizationService.enablePriority(bookingId, dto.level);
  }

  // ─── Automated Penalties ──────────────────────────────────────────────

  @Get('monetization/penalties')
  @Roles(Role.TERMINAL_OPERATOR, Role.PORT_ADMIN)
  @ApiOperation({
    summary: 'Get all penalties',
    description: 'Returns a list of all penalties applied to bookings.',
  })
  getAllPenalties() {
    return this.monetizationService.getAllPenalties();
  }

  @Post('bookings/:id/penalty')
  @Roles(Role.TERMINAL_OPERATOR, Role.PORT_ADMIN)
  @ApiOperation({
    summary: 'Apply no-show or late penalty to a booking',
    description:
      'Auto-calculates penalty based on rules: NO_SHOW=50%, LATE>15min=20%, LATE>30min=40%. Custom amount supported.',
  })
  applyPenalty(@Param('id') bookingId: string, @Body() dto: ApplyPenaltyDto) {
    return this.monetizationService.applyPenalty(
      bookingId,
      dto.type,
      dto.amount,
      dto.minutesLate,
    );
  }

  // ─── Charges Summary ──────────────────────────────────────────────────

  @Get('bookings/:id/charges')
  @Roles(Role.PORT_ADMIN, Role.TERMINAL_OPERATOR, Role.CARRIER)
  @ApiOperation({
    summary: 'View total charges breakdown for a booking',
    description:
      'Returns base price, dynamic pricing adjustment, priority fee, penalties, and total charges.',
  })
  getCharges(@Param('id') bookingId: string) {
    return this.monetizationService.getCharges(bookingId);
  }
}
