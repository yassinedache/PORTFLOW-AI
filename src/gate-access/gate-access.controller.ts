import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { GateAccessService } from './gate-access.service.js';
import { ScanQrDto } from './dto/scan.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { DeviceGuard } from '../common/guards/device.guard.js';
import { Role } from '../../generated/prisma/client.js';

@ApiTags('Gate Access')
@ApiBearerAuth()
@Controller('gate')
@UseGuards(RolesGuard, DeviceGuard)
export class GateAccessController {
  constructor(private readonly gateAccessService: GateAccessService) {}

  @Post('scan')
  @Roles(Role.GATE_AGENT)
  @ApiOperation({ summary: 'Scan QR code at gate (Gate Agent)' })
  @ApiHeader({
    name: 'x-device-id',
    description: 'Device fingerprint for device-bound gate agent authentication',
    required: false,
  })
  scan(@Body() dto: ScanQrDto) {
    return this.gateAccessService.scan(dto);
  }
}
