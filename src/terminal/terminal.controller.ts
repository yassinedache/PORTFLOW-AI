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
import { TerminalService } from './terminal.service.js';
import { CreateTerminalDto, UpdateTerminalDto } from './dto/create-terminal.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';

@ApiTags('Admin - Terminals')
@ApiBearerAuth()
@Controller('admin/terminals')
@UseGuards(RolesGuard)
export class TerminalController {
  constructor(private readonly terminalService: TerminalService) {}

  @Post()
  @Roles(Role.PORT_ADMIN)
  @ApiOperation({ summary: 'Create a new terminal' })
  create(@Body() dto: CreateTerminalDto) {
    return this.terminalService.create(dto);
  }

  @Get()
  @Roles(Role.PORT_ADMIN, Role.TERMINAL_OPERATOR, Role.CARRIER)
  @ApiOperation({ summary: 'List all terminals' })
  findAll() {
    return this.terminalService.findAll();
  }

  @Get(':id')
  @Roles(Role.PORT_ADMIN, Role.TERMINAL_OPERATOR, Role.CARRIER)
  @ApiOperation({ summary: 'Get terminal by ID' })
  findOne(@Param('id') id: string) {
    return this.terminalService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.PORT_ADMIN)
  @ApiOperation({ summary: 'Update terminal' })
  update(@Param('id') id: string, @Body() dto: UpdateTerminalDto) {
    return this.terminalService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.PORT_ADMIN)
  @ApiOperation({ summary: 'Delete terminal' })
  remove(@Param('id') id: string) {
    return this.terminalService.remove(id);
  }
}
