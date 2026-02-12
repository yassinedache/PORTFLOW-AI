import { lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './AppShell';
import { AuthGuard, GuestGuard, getDefaultRoute } from './guards';
import { Role } from '@/types';
import { useAuthStore } from '@/hooks/useAuthStore';
import { RouteLoader } from '@/components/shared/RouteLoader';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

// ── Lazy page imports ────────────────────────────────────────────────────────

// Auth
const LoginPage = lazy(() => import('@/features/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/RegisterPage'));

// Admin
const AdminOverview = lazy(() => import('@/features/admin/OverviewPage'));
const PortBuilder = lazy(() => import('@/features/admin/PortBuilderPage'));

// Carrier
const CarrierDashboard = lazy(() => import('@/features/carrier/DashboardPage'));
const TrucksPage = lazy(() => import('@/features/carrier/TrucksPage'));
const ContainersPage = lazy(() => import('@/features/carrier/ContainersPage'));
const SlotsPage = lazy(() => import('@/features/carrier/SlotsPage'));
const BookingsPage = lazy(() => import('@/features/carrier/BookingsPage'));
const BookingDetailPage = lazy(
  () => import('@/features/carrier/BookingDetailPage'),
);
const ChargesPage = lazy(() => import('@/features/carrier/ChargesPage'));
const OcrPage = lazy(() => import('@/features/carrier/OcrPage'));
const AssistantPage = lazy(() => import('@/features/carrier/AssistantPage'));

// Operator
const OperatorDashboard = lazy(
  () => import('@/features/operator/DashboardPage'),
);
const PendingBookingsPage = lazy(
  () => import('@/features/operator/PendingBookingsPage'),
);
const ConfirmedBookingsPage = lazy(
  () => import('@/features/operator/ConfirmedBookingsPage'),
);
const OperatorBookingDetail = lazy(
  () => import('@/features/operator/BookingDetailPage'),
);
const OperatorContainersPage = lazy(
  () => import('@/features/operator/ContainersPage'),
);
const RiskPage = lazy(() => import('@/features/operator/RiskPage'));
const PenaltiesPage = lazy(() => import('@/features/operator/PenaltiesPage'));
const AlertsPage = lazy(() => import('@/features/operator/AlertsPage'));
const OperatorAssistantPage = lazy(
  () => import('@/features/operator/AssistantPage'),
);

// Gate
const ScanPage = lazy(() => import('@/features/gate/ScanPage'));
const GateHistoryPage = lazy(() => import('@/features/gate/HistoryPage'));

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Wraps a lazy component with Suspense + ErrorBoundary */
function LazyPage({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<RouteLoader />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

/** Redirects authenticated users to their role-based default route */
function RoleRedirect() {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={getDefaultRoute(user.role)} replace />;
}

/** Combines AuthGuard + role restriction in one wrapper */
function RequireRole({
  roles,
  children,
}: {
  roles: Role[];
  children: ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={roles}>
      <LazyPage>{children}</LazyPage>
    </AuthGuard>
  );
}

// ── Router ───────────────────────────────────────────────────────────────────

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ─── Public / guest routes ─── */}
        <Route
          path="/login"
          element={
            <GuestGuard>
              <LazyPage>
                <LoginPage />
              </LazyPage>
            </GuestGuard>
          }
        />
        <Route
          path="/register"
          element={
            <GuestGuard>
              <LazyPage>
                <RegisterPage />
              </LazyPage>
            </GuestGuard>
          }
        />

        {/* ─── Protected app routes ─── */}
        <Route
          path="/app"
          element={
            <AuthGuard>
              <AppShell />
            </AuthGuard>
          }
        >
          {/* Index → redirect by role */}
          <Route index element={<RoleRedirect />} />

          {/* Admin */}
          <Route
            path="admin/overview"
            element={
              <RequireRole roles={[Role.PORT_ADMIN]}>
                <AdminOverview />
              </RequireRole>
            }
          />
          <Route
            path="admin/port-builder"
            element={
              <RequireRole roles={[Role.PORT_ADMIN]}>
                <PortBuilder />
              </RequireRole>
            }
          />

          {/* Carrier */}
          <Route
            path="carrier/dashboard"
            element={
              <RequireRole roles={[Role.CARRIER]}>
                <CarrierDashboard />
              </RequireRole>
            }
          />
          <Route
            path="carrier/trucks"
            element={
              <RequireRole roles={[Role.CARRIER]}>
                <TrucksPage />
              </RequireRole>
            }
          />
          <Route
            path="carrier/containers"
            element={
              <RequireRole roles={[Role.CARRIER]}>
                <ContainersPage />
              </RequireRole>
            }
          />
          <Route
            path="carrier/slots"
            element={
              <RequireRole roles={[Role.CARRIER]}>
                <SlotsPage />
              </RequireRole>
            }
          />
          <Route
            path="carrier/bookings"
            element={
              <RequireRole roles={[Role.CARRIER]}>
                <BookingsPage />
              </RequireRole>
            }
          />
          <Route
            path="carrier/bookings/:id"
            element={
              <RequireRole roles={[Role.CARRIER]}>
                <BookingDetailPage />
              </RequireRole>
            }
          />
          <Route
            path="carrier/charges"
            element={
              <RequireRole roles={[Role.CARRIER]}>
                <ChargesPage />
              </RequireRole>
            }
          />
          <Route
            path="carrier/ocr"
            element={
              <RequireRole roles={[Role.CARRIER]}>
                <OcrPage />
              </RequireRole>
            }
          />
          <Route
            path="carrier/assistant"
            element={
              <RequireRole roles={[Role.CARRIER]}>
                <AssistantPage />
              </RequireRole>
            }
          />

          {/* Operator */}
          <Route
            path="operator/dashboard"
            element={
              <RequireRole roles={[Role.TERMINAL_OPERATOR]}>
                <OperatorDashboard />
              </RequireRole>
            }
          />
          <Route
            path="operator/bookings/pending"
            element={
              <RequireRole roles={[Role.TERMINAL_OPERATOR]}>
                <PendingBookingsPage />
              </RequireRole>
            }
          />
          <Route
            path="operator/bookings/confirmed"
            element={
              <RequireRole roles={[Role.TERMINAL_OPERATOR]}>
                <ConfirmedBookingsPage />
              </RequireRole>
            }
          />
          <Route
            path="operator/bookings/:id"
            element={
              <RequireRole roles={[Role.TERMINAL_OPERATOR]}>
                <OperatorBookingDetail />
              </RequireRole>
            }
          />
          <Route
            path="operator/operations/containers"
            element={
              <RequireRole roles={[Role.TERMINAL_OPERATOR]}>
                <OperatorContainersPage />
              </RequireRole>
            }
          />
          <Route
            path="operator/risk"
            element={
              <RequireRole roles={[Role.TERMINAL_OPERATOR]}>
                <RiskPage />
              </RequireRole>
            }
          />
          <Route
            path="operator/penalties"
            element={
              <RequireRole roles={[Role.TERMINAL_OPERATOR]}>
                <PenaltiesPage />
              </RequireRole>
            }
          />
          <Route
            path="operator/alerts"
            element={
              <RequireRole roles={[Role.TERMINAL_OPERATOR]}>
                <AlertsPage />
              </RequireRole>
            }
          />
          <Route
            path="operator/assistant"
            element={
              <RequireRole roles={[Role.TERMINAL_OPERATOR]}>
                <OperatorAssistantPage />
              </RequireRole>
            }
          />

          {/* Gate */}
          <Route
            path="gate/scan"
            element={
              <RequireRole roles={[Role.GATE_AGENT]}>
                <ScanPage />
              </RequireRole>
            }
          />
          <Route
            path="gate/history"
            element={
              <RequireRole roles={[Role.GATE_AGENT]}>
                <GateHistoryPage />
              </RequireRole>
            }
          />
        </Route>

        {/* ─── Catch-all ─── */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
