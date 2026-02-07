import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { EventsGateway } from '../events/events.gateway.js';
import {
  CreateTruckDto,
  CreateContainerDto,
  UpdateTruckLocationDto,
} from './dto/create-truck.dto.js';

@Injectable()
export class CarrierService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  // ─── Trucks ─────────────────────────────────────────────────────────────

  async createTruck(dto: CreateTruckDto, carrierId: string) {
    const existing = await this.prisma.truck.findUnique({
      where: { plate: dto.plate },
    });
    if (existing) {
      throw new ConflictException(`Truck with plate ${dto.plate} already exists`);
    }

    return this.prisma.truck.create({
      data: {
        plate: dto.plate,
        carrierId,
      },
    });
  }

  async getMyTrucks(carrierId: string) {
    return this.prisma.truck.findMany({
      where: { carrierId },
      include: {
        locations: {
          orderBy: { timestamp: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteTruck(truckId: string, carrierId: string) {
    const truck = await this.prisma.truck.findUnique({ where: { id: truckId } });
    if (!truck) throw new NotFoundException('Truck not found');
    if (truck.carrierId !== carrierId) {
      throw new ForbiddenException('You can only delete your own trucks');
    }

    await this.prisma.truck.delete({ where: { id: truckId } });
    return { message: 'Truck deleted successfully' };
  }

  // ─── Containers ─────────────────────────────────────────────────────────

  async createContainer(dto: CreateContainerDto, carrierId: string) {
    const existing = await this.prisma.container.findUnique({
      where: { containerNumber: dto.containerNumber },
    });
    if (existing) {
      throw new ConflictException(
        `Container ${dto.containerNumber} already exists`,
      );
    }

    return this.prisma.container.create({
      data: {
        containerNumber: dto.containerNumber,
        carrierId,
      },
    });
  }

  async getMyContainers(carrierId: string) {
    return this.prisma.container.findMany({
      where: { carrierId },
      include: {
        trackingEvents: {
          orderBy: { timestamp: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteContainer(containerId: string, carrierId: string) {
    const container = await this.prisma.container.findUnique({
      where: { id: containerId },
    });
    if (!container) throw new NotFoundException('Container not found');
    if (container.carrierId !== carrierId) {
      throw new ForbiddenException('You can only delete your own containers');
    }

    await this.prisma.container.delete({ where: { id: containerId } });
    return { message: 'Container deleted successfully' };
  }

  // ─── Truck Location Tracking ────────────────────────────────────────────

  async updateTruckLocation(dto: UpdateTruckLocationDto, carrierId: string) {
    const truck = await this.prisma.truck.findUnique({
      where: { id: dto.truckId },
    });
    if (!truck) throw new NotFoundException('Truck not found');
    if (truck.carrierId !== carrierId) {
      throw new ForbiddenException('You can only update your own truck location');
    }

    const location = await this.prisma.truckLocation.create({
      data: {
        truckId: dto.truckId,
        lat: dto.lat,
        lng: dto.lng,
      },
    });

    // Emit real-time location update
    this.eventsGateway.emitTruckLocation({
      truckId: dto.truckId,
      plate: truck.plate,
      lat: dto.lat,
      lng: dto.lng,
      timestamp: location.timestamp,
    });

    return location;
  }

  async getTruckLocations(truckId: string, carrierId: string) {
    const truck = await this.prisma.truck.findUnique({
      where: { id: truckId },
    });
    if (!truck) throw new NotFoundException('Truck not found');
    if (truck.carrierId !== carrierId) {
      throw new ForbiddenException('You can only view your own truck locations');
    }

    return this.prisma.truckLocation.findMany({
      where: { truckId },
      orderBy: { timestamp: 'desc' },
      take: 100,
    });
  }
}
