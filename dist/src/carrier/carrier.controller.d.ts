import { CarrierService } from './carrier.service.js';
import { CreateTruckDto, CreateContainerDto, UpdateTruckLocationDto } from './dto/create-truck.dto.js';
export declare class CarrierController {
    private readonly carrierService;
    constructor(carrierService: CarrierService);
    createTruck(dto: CreateTruckDto, carrierId: string): Promise<{
        id: string;
        createdAt: Date;
        carrierId: string;
        plate: string;
    }>;
    getMyTrucks(carrierId: string): Promise<({
        locations: {
            id: string;
            truckId: string;
            timestamp: Date;
            lat: number;
            lng: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        carrierId: string;
        plate: string;
    })[]>;
    deleteTruck(id: string, carrierId: string): Promise<{
        message: string;
    }>;
    createContainer(dto: CreateContainerDto, carrierId: string): Promise<{
        id: string;
        createdAt: Date;
        carrierId: string;
        containerNumber: string;
    }>;
    getMyContainers(carrierId: string): Promise<({
        trackingEvents: {
            id: string;
            location: string;
            containerId: string;
            type: import("../../generated/prisma/enums.js").TrackingEventType;
            timestamp: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        carrierId: string;
        containerNumber: string;
    })[]>;
    deleteContainer(id: string, carrierId: string): Promise<{
        message: string;
    }>;
    updateTruckLocation(dto: UpdateTruckLocationDto, carrierId: string): Promise<{
        id: string;
        truckId: string;
        timestamp: Date;
        lat: number;
        lng: number;
    }>;
    getTruckLocations(truckId: string, carrierId: string): Promise<{
        id: string;
        truckId: string;
        timestamp: Date;
        lat: number;
        lng: number;
    }[]>;
}
