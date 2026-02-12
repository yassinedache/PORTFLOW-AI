import { apiClient } from '../apiClient';
import type {
  AiSession,
  AiMessage,
  AiQueryRequest,
  AiQueryResponse,
} from '@/types';

export interface NewChatResponse {
  sessionId: string;
  status: string;
  greeting: string;
}

export const assistantApi = {
  createSession: async (): Promise<AiSession> => {
    const res = await apiClient.post('/ai/sessions');
    return res.data;
  },

  /**
   * Start a new empty chat - clears history and context
   */
  newChat: async (): Promise<NewChatResponse> => {
    const res = await apiClient.post('/ai/chat/new');
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
