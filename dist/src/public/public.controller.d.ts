import { PublicService } from './public.service.js';
export declare class PublicController {
    private readonly publicService;
    constructor(publicService: PublicService);
    getPulse(): Promise<{
        timestamp: string;
        activeBookings: number;
        recentGateAccess: number;
        activeTerminals: number;
        terminals: {
            id: string;
            name: string;
        }[];
    }>;
    getStats(): Promise<{
        totalBookings: number;
        totalGateAccess: number;
        activeTerminals: number;
        todayBookings: number;
    }>;
    trackContainer(containerNumber: string): Promise<{
        containerNumber: string;
        events: {
            type: import("../../generated/prisma/enums.js").TrackingEventType;
            id: string;
            timestamp: Date;
            location: string;
            containerId: string;
        }[];
    }>;
}
