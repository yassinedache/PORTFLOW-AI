import { apiClient } from '../apiClient';
import type { GateScanRequest, GateScanResponse, GateAccessLog } from '@/types';

export const gateApi = {
  scan: async (data: GateScanRequest): Promise<GateScanResponse> => {
    const res = await apiClient.post('/gate/scan', data);
    return res.data;
  },

  // Gate history is from audit logs filtered to gate entity
  getHistory: async (): Promise<GateAccessLog[]> => {
    const res = await apiClient.get('/admin/audit-logs', {
      params: { entity: 'GateAccessLog', limit: 100 },
    });
    return res.data.data || res.data;
  },
};
