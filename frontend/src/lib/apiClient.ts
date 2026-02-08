import axios from 'axios';
import { useAuthStore } from '@/hooks/useAuthStore';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request Interceptor: attach JWT + CSRF ──
apiClient.interceptors.request.use((config) => {
  const { token, csrfToken: storedCsrf } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Use CSRF token from store first, fallback to cookie
  let csrfToken: string | null | undefined = storedCsrf;
  if (!csrfToken) {
    csrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrf-token='))
      ?.split('=')[1];
  }

  if (
    csrfToken &&
    config.method &&
    !['get', 'head', 'options'].includes(config.method.toLowerCase())
  ) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }

  return config;
});

// ── Response Interceptor: handle 401 ──
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Try refresh once
      const originalRequest = error.config;
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshRes = await axios.post(
            `${API_BASE_URL}/auth/refresh`,
            {},
            { withCredentials: true },
          );
          const newToken = refreshRes.data?.accessToken;
          const newCsrf = refreshRes.data?.csrfToken;
          if (newToken) {
            useAuthStore.getState().setToken(newToken);
            if (newCsrf) {
              useAuthStore.getState().setCsrfToken(newCsrf);
            }
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return apiClient(originalRequest);
          }
        } catch {
          // Refresh failed, logout
        }
      }
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default apiClient;
