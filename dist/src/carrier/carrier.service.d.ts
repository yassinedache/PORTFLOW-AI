import { PrismaService } from '../prisma/prisma.service.js';
import { EventsGateway } from '../events/events.gateway.js';
import { CreateTruckDto, CreateContainerDto, UpdateTruckLocationDto } from './dto/create-truck.dto.js';
export declare class CarrierService {
    private readonly prisma;
    private readonly eventsGateway;
    constructor(prisma: PrismaService, eventsGateway: EventsGateway);
    createTruck(dto: CreateTruckDto, carrierId: string): Promise<{
        id: string;
        createdAt: Date;
        carrierId: string;
        plate: string;
    }>;
    getMyTrucks(carrierId: string): Promise<({
        locations: {
            id: string;
            timestamp: Date;
            truckId: string;
            lat: number;
            lng: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        carrierId: string;
        plate: string;
    })[]>;
    deleteTruck(truckId: string, carrierId: string): Promise<{
        message: string;
    }>;
    createContainer(dto: CreateContainerDto, carrierId: string): Promise<{
        id: string;
        createdAt: Date;
        terminalId: string | null;
        carrierId: string;
        status: import("../../generated/prisma/enums.js").ContainerStatus;
        containerNumber: string;
        lastUpdatedAt: Date | null;
    }>;
    getMyContainers(carrierId: string): Promise<({
        trackingEvents: {
            type: import("../../generated/prisma/enums.js").TrackingEventType;
            id: string;
            timestamp: Date;
            location: string;
            containerId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        terminalId: string | null;
        carrierId: string;
        status: import("../../generated/prisma/enums.js").ContainerStatus;
        containerNumber: string;
        lastUpdatedAt: Date | null;
    })[]>;
    deleteContainer(containerId: string, carrierId: string): Promise<{
        message: string;
    }>;
    updateTruckLocation(dto: UpdateTruckLocationDto, carrierId: string): Promise<{
        id: string;
        timestamp: Date;
        truckId: string;
        lat: number;
        lng: number;
    }>;
    getTruckLocations(truckId: string, carrierId: string): Promise<{
        id: string;
        timestamp: Date;
        truckId: string;
        lat: number;
        lng: number;
    }[]>;
}
