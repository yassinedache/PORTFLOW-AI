import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/',
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(EventsGateway.name);

  afterInit() {
    this.logger.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('subscribe:terminal')
  handleSubscribeTerminal(client: Socket, terminalId: string) {
    client.join(`terminal:${terminalId}`);
    this.logger.log(`Client ${client.id} subscribed to terminal:${terminalId}`);
  }

  @SubscribeMessage('subscribe:booking')
  handleSubscribeBooking(client: Socket, bookingId: string) {
    client.join(`booking:${bookingId}`);
    this.logger.log(`Client ${client.id} subscribed to booking:${bookingId}`);
  }

  // ─── Emitters ──────────────────────────────────────────────────────────

  emitPulseUpdate(data: any) {
    this.server.emit('pulse:update', data);
  }

  emitQueueUpdate(terminalId: string, data?: any) {
    this.server
      .to(`terminal:${terminalId}`)
      .emit('queue:update', { terminalId, ...data });
    // Also emit globally
    this.server.emit('queue:update', { terminalId, ...data });
  }

  emitBookingStatus(bookingId: string, status: string) {
    this.server
      .to(`booking:${bookingId}`)
      .emit('booking:status', { bookingId, status });
    this.server.emit('booking:status', { bookingId, status });
  }

  emitAlert(alert: { type: string; message: string; terminalId?: string }) {
    if (alert.terminalId) {
      this.server.to(`terminal:${alert.terminalId}`).emit('alert:new', alert);
    }
    this.server.emit('alert:new', alert);
  }

  emitTruckLocation(data: {
    truckId: string;
    plate: string;
    lat: number;
    lng: number;
    timestamp: Date;
  }) {
    this.server.emit('truck:location', data);
    this.server.to(`truck:${data.truckId}`).emit('truck:location', data);
  }

  // ─── PRD-Required Events ─────────────────────────────────────────────

  emitBookingAtRisk(bookingId: string, data?: any) {
    const payload = { bookingId, ...data };
    this.server.to(`booking:${bookingId}`).emit('booking:at_risk', payload);
    this.server.emit('booking:at_risk', payload);
  }

  emitBookingReady(bookingId: string, data?: any) {
    const payload = { bookingId, ...data };
    this.server.to(`booking:${bookingId}`).emit('booking:ready', payload);
    this.server.emit('booking:ready', payload);
  }

  emitGateAccess(data: {
    bookingId: string;
    gateId: string;
    gateName: string;
    result: string;
    reason?: string;
  }) {
    this.server.emit('gate:access', data);
  }

  emitNotification(userId: string, notification: any) {
    this.server.to(`user:${userId}`).emit('notification:new', notification);
    // Also emit globally for any component listening
    this.server.emit('notification:new', { userId, notification });
  }

  @SubscribeMessage('subscribe:user')
  handleSubscribeUser(client: Socket, userId: string) {
    client.join(`user:${userId}`);
    this.logger.log(`Client ${client.id} subscribed to user:${userId}`);
  }

  @SubscribeMessage('subscribe:truck')
  handleSubscribeTruck(client: Socket, truckId: string) {
    client.join(`truck:${truckId}`);
    this.logger.log(`Client ${client.id} subscribed to truck:${truckId}`);
  }
}
