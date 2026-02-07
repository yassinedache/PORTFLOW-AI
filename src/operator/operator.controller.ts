import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { OperatorService } from './operator.service.js';
import { CapacityOverrideDto } from './dto/capacity-override.dto.js';
import { UpdateContainerStatusDto } from './dto/update-container-status.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';

@ApiTags('Operator Control Room')
@ApiBearerAuth()
@Controller('operator')
@UseGuards(RolesGuard)
export class OperatorController {
  constructor(private readonly operatorService: OperatorService) {}

  @Get('queue')
  @Roles(Role.TERMINAL_OPERATOR, Role.PORT_ADMIN)
  @ApiOperation({ summary: 'Get booking queue for operators' })
  @ApiQuery({ name: 'terminalId', required: false })
  getQueue(@Query('terminalId') terminalId?: string) {
    return this.operatorService.getQueue(terminalId);
  }

  @Post('capacity/override')
  @Roles(Role.TERMINAL_OPERATOR, Role.PORT_ADMIN)
  @ApiOperation({ summary: 'Override time slot capacity' })
  overrideCapacity(@Body() dto: CapacityOverrideDto) {
    return this.operatorService.overrideCapacity(dto);
  }

  @Get('alerts')
  @Roles(Role.TERMINAL_OPERATOR, Role.PORT_ADMIN)
  @ApiOperation({ summary: 'Get operator alerts (denials, capacity warnings)' })
  @ApiQuery({ name: 'terminalId', required: false })
  getAlerts(@Query('terminalId') terminalId?: string) {
    return this.operatorService.getAlerts(terminalId);
  }

  @Post('containers/:id/status')
  @Roles(Role.TERMINAL_OPERATOR, Role.PORT_ADMIN)
  @ApiOperation({ summary: 'Update container status (Operator/Admin)' })
  updateContainerStatus(
    @Param('id') id: string,
    @Body() dto: UpdateContainerStatusDto,
  ) {
    return this.operatorService.updateContainerStatus(id, dto.status);
  }

  @Post('bookings/:id/confirm-readiness')
  @Roles(Role.TERMINAL_OPERATOR, Role.PORT_ADMIN)
  @ApiOperation({
    summary: 'Confirm booking readiness — sets status to READY_TO_GO',
  })
  confirmReadiness(@Param('id') id: string, @Req() req: any) {
    const userId = req?.user?.id;
    return this.operatorService.confirmReadiness(id, userId);
  }
}
