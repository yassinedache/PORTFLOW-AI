import { apiClient } from '../apiClient';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from '@/types';

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const res = await apiClient.post('/auth/login', data);
    return res.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const res = await apiClient.post('/auth/register', data);
    return res.data;
  },

  me: async (): Promise<User> => {
    const res = await apiClient.get('/auth/csrf-token');
    // The /auth/csrf-token sets the cookie, so we call it on init
    // Then we decode user from the JWT or we refetch
    return res.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  refresh: async (): Promise<{ accessToken: string }> => {
    const res = await apiClient.post('/auth/refresh');
    return res.data;
  },

  getCsrfToken: async (): Promise<void> => {
    await apiClient.get('/auth/csrf-token');
  },
};
