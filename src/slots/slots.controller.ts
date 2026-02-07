import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SlotsService } from './slots.service.js';
import { CreateTimeSlotDto } from './dto/create-slot.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';

@ApiTags('Slots & Availability')
@ApiBearerAuth()
@Controller('slots')
@UseGuards(RolesGuard)
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Post()
  @Roles(Role.PORT_ADMIN)
  @ApiOperation({ summary: 'Create a time slot (Admin)' })
  create(@Body() dto: CreateTimeSlotDto) {
    return this.slotsService.create(dto);
  }

  @Post('bulk')
  @Roles(Role.PORT_ADMIN)
  @ApiOperation({ summary: 'Create multiple time slots (Admin)' })
  createBulk(@Body() dtos: CreateTimeSlotDto[]) {
    return this.slotsService.createBulk(dtos);
  }

  @Get('availability')
  @Roles(Role.PORT_ADMIN, Role.TERMINAL_OPERATOR, Role.CARRIER)
  @ApiOperation({ summary: 'Get slot availability' })
  @ApiQuery({ name: 'terminalId', required: false })
  @ApiQuery({ name: 'date', required: false, description: 'YYYY-MM-DD' })
  getAvailability(
    @Query('terminalId') terminalId?: string,
    @Query('date') date?: string,
  ) {
    return this.slotsService.getAvailability(terminalId, date);
  }

  @Get('heatmap')
  @Roles(Role.PORT_ADMIN, Role.TERMINAL_OPERATOR, Role.CARRIER)
  @ApiOperation({ summary: 'Get booking heatmap (next 7 days)' })
  @ApiQuery({ name: 'terminalId', required: false })
  getHeatmap(@Query('terminalId') terminalId?: string) {
    return this.slotsService.getHeatmap(terminalId);
  }
}
