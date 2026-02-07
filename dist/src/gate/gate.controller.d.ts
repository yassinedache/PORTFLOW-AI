import { GateService } from './gate.service.js';
import { CreateGateDto, UpdateGateDto } from './dto/create-gate.dto.js';
export declare class GateController {
    private readonly gateService;
    constructor(gateService: GateService);
    create(dto: CreateGateDto): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        terminalId: string;
    }>;
    findAll(): Promise<({
        terminal: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        name: string;
        isActive: boolean;
        terminalId: string;
    })[]>;
    findOne(id: string): Promise<{
        terminal: {
            id: string;
            name: string;
            createdAt: Date;
            location: string;
            isActive: boolean;
        };
    } & {
        id: string;
        name: string;
        isActive: boolean;
        terminalId: string;
    }>;
    update(id: string, dto: UpdateGateDto): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        terminalId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        terminalId: string;
    }>;
}
