import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    afterInit(): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleSubscribeTerminal(client: Socket, terminalId: string): void;
    handleSubscribeBooking(client: Socket, bookingId: string): void;
    emitPulseUpdate(data: any): void;
    emitQueueUpdate(terminalId: string, data?: any): void;
    emitBookingStatus(bookingId: string, status: string): void;
    emitAlert(alert: {
        type: string;
        message: string;
        terminalId?: string;
    }): void;
    emitTruckLocation(data: {
        truckId: string;
        plate: string;
        lat: number;
        lng: number;
        timestamp: Date;
    }): void;
    emitBookingAtRisk(bookingId: string, data?: any): void;
    emitBookingReady(bookingId: string, data?: any): void;
    emitGateAccess(data: {
        bookingId: string;
        gateId: string;
        gateName: string;
        result: string;
        reason?: string;
    }): void;
    handleSubscribeTruck(client: Socket, truckId: string): void;
}
