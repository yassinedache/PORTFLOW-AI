import { TerminalService } from './terminal.service.js';
import { CreateTerminalDto, UpdateTerminalDto } from './dto/create-terminal.dto.js';
export declare class TerminalController {
    private readonly terminalService;
    constructor(terminalService: TerminalService);
    create(dto: CreateTerminalDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        location: string;
        isActive: boolean;
    }>;
    findAll(): Promise<({
        _count: {
            bookings: number;
        };
        gates: {
            id: string;
            name: string;
            isActive: boolean;
            terminalId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
        location: string;
        isActive: boolean;
    })[]>;
    findOne(id: string): Promise<{
        gates: {
            id: string;
            name: string;
            isActive: boolean;
            terminalId: string;
        }[];
        timeSlots: {
            id: string;
            terminalId: string;
            startTime: Date;
            endTime: Date;
            capacity: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
        location: string;
        isActive: boolean;
    }>;
    update(id: string, dto: UpdateTerminalDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        location: string;
        isActive: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        location: string;
        isActive: boolean;
    }>;
}
