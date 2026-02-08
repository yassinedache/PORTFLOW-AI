import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import { Role } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  csrfToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string, csrfToken?: string) => void;
  setToken: (token: string) => void;
  setCsrfToken: (csrfToken: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  hasRole: (...roles: Role[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      csrfToken: null,
      isAuthenticated: false,

      setAuth: (user, token, csrfToken) =>
        set({
          user,
          token,
          csrfToken: csrfToken ?? null,
          isAuthenticated: true,
        }),

      setToken: (token) => set({ token }),

      setCsrfToken: (csrfToken) => set({ csrfToken }),

      setUser: (user) => set({ user, isAuthenticated: true }),

      logout: () =>
        set({
          user: null,
          token: null,
          csrfToken: null,
          isAuthenticated: false,
        }),

      hasRole: (...roles) => {
        const { user } = get();
        return user ? roles.includes(user.role) : false;
      },
    }),
    {
      name: 'portflow-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        csrfToken: state.csrfToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
