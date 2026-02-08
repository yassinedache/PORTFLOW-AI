import { lazy, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageTransition, MetricCard, EmptyState } from '@/components/shared';
import { CardSkeleton } from '@/components/shared/Skeletons';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { operatorApi } from '@/lib/api';
import { queryKeys } from '@/lib/constants';
import { formatDateTime } from '@/lib/utils';
import type { Booking } from '@/types';

// Lazy-load the recharts-heavy chart component
const RiskChart = lazy(() => import('./RiskChart'));

export default function RiskPage() {
  const navigate = useNavigate();

  const { data: queue, isLoading } = useQuery({
    queryKey: queryKeys.operatorQueue(),
    queryFn: () => operatorApi.getQueue(),
  });

  // Filter bookings with readiness predictions
  const riskBookings = (queue ?? [])
    .filter((b) => b.readinessScore != null)
    .sort((a, b) => (a.readinessScore ?? 1) - (b.readinessScore ?? 1));

  const highRisk = riskBookings.filter((b) => (b.readinessScore ?? 1) < 0.4);
  const mediumRisk = riskBookings.filter(
    (b) => (b.readinessScore ?? 1) >= 0.4 && (b.readinessScore ?? 1) < 0.7,
  );
  const lowRisk = riskBookings.filter((b) => (b.readinessScore ?? 1) >= 0.7);

  // Chart data
  const chartData = riskBookings.slice(0, 15).map((b) => ({
    name: b.terminal?.name?.slice(0, 10) || b.id.slice(0, 6),
    score: Math.round((b.readinessScore ?? 0) * 100),
  }));

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Risk Assessment</h1>
          <p className="text-sm text-muted-foreground">
            Monitor booking readiness and take preventive actions
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MetricCard
                title="High Risk"
                value={highRisk.length}
                icon={<AlertTriangle className="h-5 w-5" />}
                color="red"
              />
              <MetricCard
                title="Medium Risk"
                value={mediumRisk.length}
                icon={<TrendingUp className="h-5 w-5" />}
                color="yellow"
              />
              <MetricCard
                title="Low Risk"
                value={lowRisk.length}
                icon={<ShieldCheck className="h-5 w-5" />}
                color="emerald"
              />
            </div>

            {/* Chart — lazy-loaded */}
            {chartData.length > 0 && (
              <Suspense
                fallback={
                  <Card>
                    <CardContent className="p-6">
                      <div className="h-64 animate-shimmer rounded-lg" />
                    </CardContent>
                  </Card>
                }
              >
                <RiskChart chartData={chartData} />
              </Suspense>
            )}

            {/* Risk list */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">At-Risk Bookings</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {!riskBookings.length ? (
                  <EmptyState
                    title="No risk data"
                    description="Readiness predictions will appear here"
                    icon={
                      <ShieldCheck className="h-8 w-8 text-muted-foreground" />
                    }
                  />
                ) : (
                  <div className="divide-y divide-border/50">
                    {riskBookings.map((booking, i) => {
                      const score = booking.readinessScore ?? 0;
                      const riskLevel =
                        score < 0.4 ? 'High' : score < 0.7 ? 'Medium' : 'Low';
                      const riskColor =
                        score < 0.4
                          ? 'text-red-400'
                          : score < 0.7
                            ? 'text-yellow-400'
                            : 'text-emerald-400';
                      const riskBg =
                        score < 0.4
                          ? 'bg-red-500/10 border-red-500/30'
                          : score < 0.7
                            ? 'bg-yellow-500/10 border-yellow-500/30'
                            : 'bg-emerald-500/10 border-emerald-500/30';

                      return (
                        <motion.div
                          key={booking.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.03 }}
                          onClick={() =>
                            navigate(`/app/operator/bookings/${booking.id}`)
                          }
                          className="flex items-center justify-between px-4 py-3 hover:bg-foreground/5 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${riskColor} border ${riskBg}`}
                            >
                              {Math.round(score * 100)}
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {booking.terminal?.name || 'Terminal'}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {booking.container?.containerNumber ||
                                  booking.id.slice(0, 8)}
                                {' · '}
                                {formatDateTime(booking.createdAt)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              className={`${riskBg} ${riskColor} border text-xs`}
                            >
                              {riskLevel} Risk
                            </Badge>
                            <StatusBadge status={booking.status} />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </PageTransition>
  );
}
