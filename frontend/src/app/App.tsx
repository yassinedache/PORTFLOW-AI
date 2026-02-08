import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AppRouter } from '@/app/router';
import { useEffect } from 'react';
import {
  connectSocket,
  setupSocketListeners,
  disconnectSocket,
} from '@/lib/socket';
import { useAuthStore } from '@/hooks/useAuthStore';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function SocketManager() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      connectSocket();
      setupSocketListeners(queryClient);
    }
    return () => {
      disconnectSocket();
    };
  }, [isAuthenticated]);

  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SocketManager />
        <AppRouter />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(148, 163, 184, 0.15)',
              color: '#e2e8f0',
              backdropFilter: 'blur(16px)',
            },
          }}
        />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
