import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ZoneService } from './zone.service.js';
import { CreateZoneDto, UpdateZoneDto } from './dto/create-zone.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';

@ApiTags('Admin - Zones')
@ApiBearerAuth()
@Controller('admin/zones')
@UseGuards(RolesGuard)
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Post()
  @Roles(Role.PORT_ADMIN)
  @ApiOperation({ summary: 'Create a zone (Admin)' })
  create(@Body() dto: CreateZoneDto) {
    return this.zoneService.create(dto);
  }

  @Get()
  @Roles(Role.PORT_ADMIN, Role.TERMINAL_OPERATOR)
  @ApiOperation({ summary: 'List all zones' })
  @ApiQuery({ name: 'terminalId', required: false })
  findAll(@Query('terminalId') terminalId?: string) {
    return this.zoneService.findAll(terminalId);
  }

  @Get(':id')
  @Roles(Role.PORT_ADMIN, Role.TERMINAL_OPERATOR)
  @ApiOperation({ summary: 'Get zone by ID' })
  findOne(@Param('id') id: string) {
    return this.zoneService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.PORT_ADMIN)
  @ApiOperation({ summary: 'Update a zone (Admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateZoneDto) {
    return this.zoneService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.PORT_ADMIN)
  @ApiOperation({ summary: 'Delete a zone (Admin)' })
  remove(@Param('id') id: string) {
    return this.zoneService.remove(id);
  }
}
