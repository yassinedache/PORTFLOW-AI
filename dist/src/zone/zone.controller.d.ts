import { ZoneService } from './zone.service.js';
import { CreateZoneDto, UpdateZoneDto } from './dto/create-zone.dto.js';
export declare class ZoneController {
    private readonly zoneService;
    constructor(zoneService: ZoneService);
    create(dto: CreateZoneDto): Promise<{
        terminal: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        isActive: boolean;
        terminalId: string;
        type: string;
        maxTrucks: number;
    }>;
    findAll(terminalId?: string): Promise<({
        terminal: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        isActive: boolean;
        terminalId: string;
        type: string;
        maxTrucks: number;
    })[]>;
    findOne(id: string): Promise<{
        terminal: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        isActive: boolean;
        terminalId: string;
        type: string;
        maxTrucks: number;
    }>;
    update(id: string, dto: UpdateZoneDto): Promise<{
        terminal: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        isActive: boolean;
        terminalId: string;
        type: string;
        maxTrucks: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
