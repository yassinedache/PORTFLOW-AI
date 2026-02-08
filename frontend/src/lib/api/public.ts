import { apiClient } from '../apiClient';
import type { PublicPulse, PublicStats, TrackingEvent } from '@/types';

export const publicApi = {
  getPulse: async (): Promise<PublicPulse[]> => {
    const res = await apiClient.get('/public/pulse');
    return res.data;
  },

  getStats: async (): Promise<PublicStats> => {
    const res = await apiClient.get('/public/stats');
    return res.data;
  },

  trackContainer: async (containerNumber: string): Promise<TrackingEvent[]> => {
    const res = await apiClient.get(
      `/public/containers/${containerNumber}/track`,
    );
    return res.data;
  },
};
