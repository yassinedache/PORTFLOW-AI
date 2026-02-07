import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CarrierService } from './carrier.service.js';
import {
  CreateTruckDto,
  CreateContainerDto,
  UpdateTruckLocationDto,
} from './dto/create-truck.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';

@ApiTags('Carrier - Fleet Management')
@ApiBearerAuth()
@Controller('carrier')
@UseGuards(RolesGuard)
export class CarrierController {
  constructor(private readonly carrierService: CarrierService) {}

  // ─── Trucks ─────────────────────────────────────────────────────────────

  @Post('trucks')
  @Roles(Role.CARRIER)
  @ApiOperation({ summary: 'Register a truck (Carrier)' })
  createTruck(
    @Body() dto: CreateTruckDto,
    @CurrentUser('id') carrierId: string,
  ) {
    return this.carrierService.createTruck(dto, carrierId);
  }

  @Get('trucks')
  @Roles(Role.CARRIER)
  @ApiOperation({ summary: 'Get my trucks (Carrier)' })
  getMyTrucks(@CurrentUser('id') carrierId: string) {
    return this.carrierService.getMyTrucks(carrierId);
  }

  @Delete('trucks/:id')
  @Roles(Role.CARRIER)
  @ApiOperation({ summary: 'Delete a truck (Carrier)' })
  deleteTruck(
    @Param('id') id: string,
    @CurrentUser('id') carrierId: string,
  ) {
    return this.carrierService.deleteTruck(id, carrierId);
  }

  // ─── Containers ─────────────────────────────────────────────────────────

  @Post('containers')
  @Roles(Role.CARRIER)
  @ApiOperation({ summary: 'Register a container (Carrier)' })
  createContainer(
    @Body() dto: CreateContainerDto,
    @CurrentUser('id') carrierId: string,
  ) {
    return this.carrierService.createContainer(dto, carrierId);
  }

  @Get('containers')
  @Roles(Role.CARRIER)
  @ApiOperation({ summary: 'Get my containers (Carrier)' })
  getMyContainers(@CurrentUser('id') carrierId: string) {
    return this.carrierService.getMyContainers(carrierId);
  }

  @Delete('containers/:id')
  @Roles(Role.CARRIER)
  @ApiOperation({ summary: 'Delete a container (Carrier)' })
  deleteContainer(
    @Param('id') id: string,
    @CurrentUser('id') carrierId: string,
  ) {
    return this.carrierService.deleteContainer(id, carrierId);
  }

  // ─── Truck Location Tracking ────────────────────────────────────────────

  @Post('trucks/location')
  @Roles(Role.CARRIER)
  @ApiOperation({ summary: 'Update truck GPS location (Carrier)' })
  updateTruckLocation(
    @Body() dto: UpdateTruckLocationDto,
    @CurrentUser('id') carrierId: string,
  ) {
    return this.carrierService.updateTruckLocation(dto, carrierId);
  }

  @Get('trucks/:id/locations')
  @Roles(Role.CARRIER)
  @ApiOperation({ summary: 'Get truck location history (Carrier)' })
  getTruckLocations(
    @Param('id') truckId: string,
    @CurrentUser('id') carrierId: string,
  ) {
    return this.carrierService.getTruckLocations(truckId, carrierId);
  }
}
