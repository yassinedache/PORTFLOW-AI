import { apiClient } from '../apiClient';
import type {
  Booking,
  OperatorAlert,
  CapacityOverrideRequest,
  UpdateContainerStatusRequest,
  PenaltyRequest,
  Penalty,
} from '@/types';

export const operatorApi = {
  // ── Queue ──
  getQueue: async (terminalId?: string): Promise<Booking[]> => {
    const params = terminalId ? { terminalId } : {};
    const res = await apiClient.get('/operator/queue', { params });
    return res.data;
  },

  // ── Approve / Reject ──
  approveBooking: async (id: string): Promise<Booking> => {
    const res = await apiClient.post(`/operator/bookings/${id}/approve`);
    return res.data;
  },
  rejectBooking: async (id: string, reason?: string): Promise<Booking> => {
    const res = await apiClient.post(`/operator/bookings/${id}/reject`, {
      reason,
    });
    return res.data;
  },

  // ── Container Status ──
  updateContainerStatus: async (
    containerId: string,
    data: UpdateContainerStatusRequest,
  ): Promise<void> => {
    await apiClient.post(`/operator/containers/${containerId}/status`, data);
  },

  // ── Confirm Readiness ──
  confirmReadiness: async (bookingId: string): Promise<Booking> => {
    const res = await apiClient.post(
      `/operator/bookings/${bookingId}/confirm-readiness`,
    );
    return res.data;
  },

  // ── Capacity Override ──
  overrideCapacity: async (data: CapacityOverrideRequest): Promise<void> => {
    await apiClient.post('/operator/capacity/override', data);
  },

  // ── Alerts ──
  getAlerts: async (terminalId?: string): Promise<OperatorAlert[]> => {
    const params = terminalId ? { terminalId } : {};
    const res = await apiClient.get('/operator/alerts', { params });
    return res.data;
  },

  // ── Penalties ──
  applyPenalty: async (
    bookingId: string,
    data: PenaltyRequest,
  ): Promise<Penalty> => {
    const res = await apiClient.post(`/bookings/${bookingId}/penalty`, data);
    return res.data;
  },

  getPenalties: async (): Promise<Penalty[]> => {
    const res = await apiClient.get('/monetization/penalties');
    return res.data;
  },
};
