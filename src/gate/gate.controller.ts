import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GateService } from './gate.service.js';
import { CreateGateDto, UpdateGateDto } from './dto/create-gate.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';

@ApiTags('Admin - Gates')
@ApiBearerAuth()
@Controller('admin/gates')
@UseGuards(RolesGuard)
export class GateController {
  constructor(private readonly gateService: GateService) {}

  @Post()
  @Roles(Role.PORT_ADMIN)
  @ApiOperation({ summary: 'Create a new gate' })
  create(@Body() dto: CreateGateDto) {
    return this.gateService.create(dto);
  }

  @Get()
  @Roles(Role.PORT_ADMIN)
  @ApiOperation({ summary: 'List all gates' })
  findAll() {
    return this.gateService.findAll();
  }

  @Get(':id')
  @Roles(Role.PORT_ADMIN)
  @ApiOperation({ summary: 'Get gate by ID' })
  findOne(@Param('id') id: string) {
    return this.gateService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.PORT_ADMIN)
  @ApiOperation({ summary: 'Update gate' })
  update(@Param('id') id: string, @Body() dto: UpdateGateDto) {
    return this.gateService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.PORT_ADMIN)
  @ApiOperation({ summary: 'Delete gate' })
  remove(@Param('id') id: string) {
    return this.gateService.remove(id);
  }
}
