import { apiClient } from '../apiClient';
import type {
  AiSession,
  AiMessage,
  AiQueryRequest,
  AiQueryResponse,
} from '@/types';

export const assistantApi = {
  createSession: async (): Promise<AiSession> => {
    const res = await apiClient.post('/ai/sessions');
    return res.data;
  },

  query: async (data: AiQueryRequest): Promise<AiQueryResponse> => {
    const res = await apiClient.post('/ai/query', data);
    return res.data;
  },

  getHistory: async (sessionId: string): Promise<AiMessage[]> => {
    const res = await apiClient.get(`/ai/sessions/${sessionId}/history`);
    return res.data;
  },

  getReadiness: async (
    bookingId: string,
  ): Promise<{ probability: number; riskLevel: string }> => {
    const res = await apiClient.get(`/ai/readiness/${bookingId}`);
    return res.data;
  },
};
