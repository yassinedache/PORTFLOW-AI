var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, ConflictException, ForbiddenException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { EventsGateway } from '../events/events.gateway.js';
let CarrierService = class CarrierService {
    prisma;
    eventsGateway;
    constructor(prisma, eventsGateway) {
        this.prisma = prisma;
        this.eventsGateway = eventsGateway;
    }
    async createTruck(dto, carrierId) {
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
    async getMyTrucks(carrierId) {
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
    async deleteTruck(truckId, carrierId) {
        const truck = await this.prisma.truck.findUnique({ where: { id: truckId } });
        if (!truck)
            throw new NotFoundException('Truck not found');
        if (truck.carrierId !== carrierId) {
            throw new ForbiddenException('You can only delete your own trucks');
        }
        await this.prisma.truck.delete({ where: { id: truckId } });
        return { message: 'Truck deleted successfully' };
    }
    async createContainer(dto, carrierId) {
        const existing = await this.prisma.container.findUnique({
            where: { containerNumber: dto.containerNumber },
        });
        if (existing) {
            throw new ConflictException(`Container ${dto.containerNumber} already exists`);
        }
        return this.prisma.container.create({
            data: {
                containerNumber: dto.containerNumber,
                carrierId,
            },
        });
    }
    async getMyContainers(carrierId) {
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
    async deleteContainer(containerId, carrierId) {
        const container = await this.prisma.container.findUnique({
            where: { id: containerId },
        });
        if (!container)
            throw new NotFoundException('Container not found');
        if (container.carrierId !== carrierId) {
            throw new ForbiddenException('You can only delete your own containers');
        }
        await this.prisma.container.delete({ where: { id: containerId } });
        return { message: 'Container deleted successfully' };
    }
    async updateTruckLocation(dto, carrierId) {
        const truck = await this.prisma.truck.findUnique({
            where: { id: dto.truckId },
        });
        if (!truck)
            throw new NotFoundException('Truck not found');
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
        this.eventsGateway.emitTruckLocation({
            truckId: dto.truckId,
            plate: truck.plate,
            lat: dto.lat,
            lng: dto.lng,
            timestamp: location.timestamp,
        });
        return location;
    }
    async getTruckLocations(truckId, carrierId) {
        const truck = await this.prisma.truck.findUnique({
            where: { id: truckId },
        });
        if (!truck)
            throw new NotFoundException('Truck not found');
        if (truck.carrierId !== carrierId) {
            throw new ForbiddenException('You can only view your own truck locations');
        }
        return this.prisma.truckLocation.findMany({
            where: { truckId },
            orderBy: { timestamp: 'desc' },
            take: 100,
        });
    }
};
CarrierService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        EventsGateway])
], CarrierService);
export { CarrierService };
//# sourceMappingURL=carrier.service.js.map