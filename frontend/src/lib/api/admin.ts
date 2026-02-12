import { apiClient } from '../apiClient';
import type {
  Terminal,
  Gate,
  Zone,
  TimeSlot,
  CreateTerminalRequest,
  UpdateTerminalRequest,
  CreateGateRequest,
  UpdateGateRequest,
  CreateZoneRequest,
  UpdateZoneRequest,
  CreateTimeSlotRequest,
  AuditLog,
  MetricDaily,
} from '@/types';

export const adminApi = {
  // ── Terminals ──
  getTerminals: async (): Promise<Terminal[]> => {
    const res = await apiClient.get('/admin/terminals');
    return res.data;
  },
  getTerminal: async (id: string): Promise<Terminal> => {
    const res = await apiClient.get(`/admin/terminals/${id}`);
    return res.data;
  },
  createTerminal: async (data: CreateTerminalRequest): Promise<Terminal> => {
    const res = await apiClient.post('/admin/terminals', data);
    return res.data;
  },
  updateTerminal: async (
    id: string,
    data: UpdateTerminalRequest,
  ): Promise<Terminal> => {
    const res = await apiClient.put(`/admin/terminals/${id}`, data);
    return res.data;
  },
  deleteTerminal: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/terminals/${id}`);
  },

  // ── Gates ──
  getGates: async (): Promise<Gate[]> => {
    const res = await apiClient.get('/admin/gates');
    return res.data;
  },
  getGate: async (id: string): Promise<Gate> => {
    const res = await apiClient.get(`/admin/gates/${id}`);
    return res.data;
  },
  createGate: async (data: CreateGateRequest): Promise<Gate> => {
    const res = await apiClient.post('/admin/gates', data);
    return res.data;
  },
  updateGate: async (id: string, data: UpdateGateRequest): Promise<Gate> => {
    const res = await apiClient.put(`/admin/gates/${id}`, data);
    return res.data;
  },
  deleteGate: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/gates/${id}`);
  },

  // ── Zones ──
  getZones: async (terminalId?: string): Promise<Zone[]> => {
    const params = terminalId ? { terminalId } : {};
    const res = await apiClient.get('/admin/zones', { params });
    return res.data;
  },
  getZone: async (id: string): Promise<Zone> => {
    const res = await apiClient.get(`/admin/zones/${id}`);
    return res.data;
  },
  createZone: async (data: CreateZoneRequest): Promise<Zone> => {
    const res = await apiClient.post('/admin/zones', data);
    return res.data;
  },
  updateZone: async (id: string, data: UpdateZoneRequest): Promise<Zone> => {
    const res = await apiClient.put(`/admin/zones/${id}`, data);
    return res.data;
  },
  deleteZone: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/zones/${id}`);
  },

  // ── Time Slots ──
  createTimeSlot: async (data: CreateTimeSlotRequest): Promise<TimeSlot> => {
    const res = await apiClient.post('/slots', data);
    return res.data;
  },
  bulkCreateTimeSlots: async (
    data: CreateTimeSlotRequest[],
  ): Promise<TimeSlot[]> => {
    const res = await apiClient.post('/slots/bulk', data);
    return res.data;
  },
  getSlotAvailability: async (
    terminalId: string,
    date?: string,
  ): Promise<import('@/types').SlotAvailability[]> => {
    const params: Record<string, string> = { terminalId };
    if (date) params.date = date;
    const res = await apiClient.get('/slots/availability', { params });
    return res.data;
  },

  // ── Audit Logs ──
  getAuditLogs: async (params?: {
    page?: number;
    limit?: number;
    userId?: string;
    entity?: string;
    action?: string;
  }): Promise<{ data: AuditLog[]; total: number }> => {
    const res = await apiClient.get('/admin/audit-logs', { params });
    return res.data;
  },

  // ── Analytics ──
  getWaitingTimeAnalytics: async (
    terminalId?: string,
    days?: number,
  ): Promise<MetricDaily[]> => {
    const params: Record<string, unknown> = {};
    if (terminalId) params.terminalId = terminalId;
    if (days) params.days = days;
    const res = await apiClient.get('/admin/analytics/waiting-time', {
      params,
    });
    return res.data.daily ?? [];
  },
};
