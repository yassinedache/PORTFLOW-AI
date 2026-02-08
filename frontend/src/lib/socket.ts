import { io, Socket } from 'socket.io-client';
import { QueryClient } from '@tanstack/react-query';
import { queryKeys } from './constants';

const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:3000';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(WS_URL, {
      autoConnect: false,
      transports: ['websocket', 'polling'],
    });
  }
  return socket;
}

export function connectSocket() {
  const s = getSocket();
  if (!s.connected) {
    s.connect();
  }
  return s;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function subscribeToTerminal(terminalId: string) {
  const s = getSocket();
  s.emit('subscribe:terminal', terminalId);
}

export function subscribeToBooking(bookingId: string) {
  const s = getSocket();
  s.emit('subscribe:booking', bookingId);
}

export function subscribeToTruck(truckId: string) {
  const s = getSocket();
  s.emit('subscribe:truck', truckId);
}

export function setupSocketListeners(queryClient: QueryClient) {
  const s = getSocket();

  s.on('booking:status', (data: { bookingId: string }) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.myBookings });
    queryClient.invalidateQueries({
      queryKey: queryKeys.booking(data.bookingId),
    });
    queryClient.invalidateQueries({ queryKey: ['operator', 'queue'] });
  });

  s.on('booking:at_risk', (data: { bookingId: string }) => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.booking(data.bookingId),
    });
    queryClient.invalidateQueries({ queryKey: queryKeys.myBookings });
  });

  s.on('booking:ready', (data: { bookingId: string }) => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.booking(data.bookingId),
    });
    queryClient.invalidateQueries({ queryKey: queryKeys.myBookings });
  });

  s.on('queue:update', () => {
    queryClient.invalidateQueries({ queryKey: ['operator', 'queue'] });
    queryClient.invalidateQueries({ queryKey: ['slots'] });
  });

  s.on('gate:access', () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.gateScanHistory });
    queryClient.invalidateQueries({ queryKey: ['operator', 'alerts'] });
  });

  s.on('pulse:update', () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.publicPulse });
  });

  s.on('truck:location', () => {
    queryClient.invalidateQueries({ queryKey: ['carrier', 'trucks'] });
  });

  s.on('alert:new', () => {
    queryClient.invalidateQueries({ queryKey: ['operator', 'alerts'] });
  });
}
