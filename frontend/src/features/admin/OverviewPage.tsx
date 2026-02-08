import { lazy, Suspense, useMemo } from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Building2,
  DoorOpen,
  CalendarClock,
  ClipboardList,
} from 'lucide-react';
import { PageTransition, MetricCard, ErrorAlert } from '@/components/shared';
import { PageSkeleton } from '@/components/shared/Skeletons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { adminApi } from '@/lib/api';
import { queryKeys } from '@/lib/constants';

// Lazy-load the recharts-heavy chart section
const OverviewCharts = lazy(() => import('./OverviewCharts'));

export default function OverviewPage() {
  const {
    data: terminals,
    isLoading: loadingTerminals,
    isError: errorTerminals,
    refetch: refetchTerminals,
  } = useQuery({
    queryKey: queryKeys.terminals,
    queryFn: adminApi.getTerminals,
  });

  const { data: analytics, isLoading: loadingAnalytics } = useQuery({
    queryKey: queryKeys.waitingTime(),
    queryFn: () => adminApi.getWaitingTimeAnalytics(undefined, 30),
  });

  const today = new Date().toISOString().split('T')[0]!;
  const slotQueries = useQueries({
    queries: (terminals ?? []).map((t) => ({
      queryKey: queryKeys.slotsAvailability(t.id, today),
      queryFn: () => adminApi.getSlotAvailability(t.id, today),
      enabled: !!terminals?.length,
    })),
  });

  const activeSlots = useMemo(() => {
    return slotQueries.reduce((sum, q) => {
      if (!q.data) return sum;
      return sum + q.data.reduce((s, slot) => s + slot.availableCount, 0);
    }, 0);
  }, [slotQueries]);

  if (loadingTerminals) return <PageSkeleton />;
  if (errorTerminals) return <ErrorAlert onRetry={refetchTerminals} />;

  const totalGates =
    terminals?.reduce((acc, t) => acc + (t.gates?.length || 0), 0) || 0;
  const totalBookings =
    terminals?.reduce((acc, t) => acc + (t._count?.bookings || 0), 0) || 0;
  const activeTerminals = terminals?.filter((t) => t.isActive).length || 0;

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Overview</h1>
          <p className="text-sm text-muted-foreground">
            Monitor your port infrastructure
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Terminals"
            value={terminals?.length || 0}
            subtitle={`${activeTerminals} active`}
            icon={<Building2 className="h-5 w-5" />}
            glowColor="rgba(59, 130, 246, 0.15)"
          />
          <MetricCard
            title="Gates"
            value={totalGates}
            icon={<DoorOpen className="h-5 w-5" />}
            glowColor="rgba(99, 102, 241, 0.15)"
          />
          <MetricCard
            title="Total Bookings"
            value={totalBookings}
            icon={<ClipboardList className="h-5 w-5" />}
            glowColor="rgba(16, 185, 129, 0.15)"
          />
          <MetricCard
            title="Active Slots"
            value={activeSlots}
            icon={<CalendarClock className="h-5 w-5" />}
            glowColor="rgba(245, 158, 11, 0.15)"
          />
        </div>

        {/* Charts — lazy-loaded to split recharts into its own chunk */}
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="h-80 animate-shimmer rounded-lg" />
              <div className="h-80 animate-shimmer rounded-lg" />
            </div>
          }
        >
          <OverviewCharts analytics={analytics} loading={loadingAnalytics} />
        </Suspense>

        {/* Terminal List */}
        <Card>
          <CardHeader>
            <CardTitle>Terminals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {terminals?.map((terminal, i) => (
                <motion.div
                  key={terminal.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="glass rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{terminal.name}</h3>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        terminal.isActive ? 'bg-success' : 'bg-destructive'
                      }`}
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {terminal.location}
                  </p>
                  <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                    <span>{terminal.gates?.length || 0} gates</span>
                    <span>{terminal._count?.bookings || 0} bookings</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
