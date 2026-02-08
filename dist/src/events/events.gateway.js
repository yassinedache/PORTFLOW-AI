var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EventsGateway_1;
import { WebSocketGateway, WebSocketServer, SubscribeMessage, } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
let EventsGateway = EventsGateway_1 = class EventsGateway {
    server;
    logger = new Logger(EventsGateway_1.name);
    afterInit() {
        this.logger.log('WebSocket Gateway initialized');
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleSubscribeTerminal(client, terminalId) {
        client.join(`terminal:${terminalId}`);
        this.logger.log(`Client ${client.id} subscribed to terminal:${terminalId}`);
    }
    handleSubscribeBooking(client, bookingId) {
        client.join(`booking:${bookingId}`);
        this.logger.log(`Client ${client.id} subscribed to booking:${bookingId}`);
    }
    emitPulseUpdate(data) {
        this.server.emit('pulse:update', data);
    }
    emitQueueUpdate(terminalId, data) {
        this.server
            .to(`terminal:${terminalId}`)
            .emit('queue:update', { terminalId, ...data });
        this.server.emit('queue:update', { terminalId, ...data });
    }
    emitBookingStatus(bookingId, status) {
        this.server
            .to(`booking:${bookingId}`)
            .emit('booking:status', { bookingId, status });
        this.server.emit('booking:status', { bookingId, status });
    }
    emitAlert(alert) {
        if (alert.terminalId) {
            this.server.to(`terminal:${alert.terminalId}`).emit('alert:new', alert);
        }
        this.server.emit('alert:new', alert);
    }
    emitTruckLocation(data) {
        this.server.emit('truck:location', data);
        this.server.to(`truck:${data.truckId}`).emit('truck:location', data);
    }
    emitBookingAtRisk(bookingId, data) {
        const payload = { bookingId, ...data };
        this.server.to(`booking:${bookingId}`).emit('booking:at_risk', payload);
        this.server.emit('booking:at_risk', payload);
    }
    emitBookingReady(bookingId, data) {
        const payload = { bookingId, ...data };
        this.server.to(`booking:${bookingId}`).emit('booking:ready', payload);
        this.server.emit('booking:ready', payload);
    }
    emitGateAccess(data) {
        this.server.emit('gate:access', data);
    }
    handleSubscribeTruck(client, truckId) {
        client.join(`truck:${truckId}`);
        this.logger.log(`Client ${client.id} subscribed to truck:${truckId}`);
    }
};
__decorate([
    WebSocketServer(),
    __metadata("design:type", Server)
], EventsGateway.prototype, "server", void 0);
__decorate([
    SubscribeMessage('subscribe:terminal'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Socket, String]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleSubscribeTerminal", null);
__decorate([
    SubscribeMessage('subscribe:booking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Socket, String]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleSubscribeBooking", null);
__decorate([
    SubscribeMessage('subscribe:truck'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Socket, String]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleSubscribeTruck", null);
EventsGateway = EventsGateway_1 = __decorate([
    WebSocketGateway({
        cors: {
            origin: '*',
        },
        namespace: '/',
    })
], EventsGateway);
export { EventsGateway };
//# sourceMappingURL=events.gateway.js.map