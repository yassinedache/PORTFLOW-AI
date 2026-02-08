import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ClipboardList, AlertTriangle, Container, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageTransition, MetricCard, EmptyState } from '@/components/shared';
import { CardSkeleton } from '@/components/shared/Skeletons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { operatorApi } from '@/lib/api';
import { queryKeys } from '@/lib/constants';
import { formatDateTime } from '@/lib/utils';
import { BookingStatus } from '@/types';

export default function DashboardPage() {
  const navigate = useNavigate();

  const { data: queue, isLoading: queueLoading } = useQuery({
    queryKey: queryKeys.operatorQueue(),
    queryFn: () => operatorApi.getQueue(),
  });

  const { data: alerts, isLoading: alertsLoading } = useQuery({
    queryKey: queryKeys.operatorAlerts(),
    queryFn: () => operatorApi.getAlerts(),
  });

  const pendingCount =
    queue?.filter((b) => b.status === BookingStatus.PENDING).length ?? 0;
  const confirmedCount =
    queue?.filter((b) => b.status === BookingStatus.CONFIRMED).length ?? 0;

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Operator Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Monitor terminal operations at a glance
          </p>
        </div>

        {/* Metrics */}
        {queueLoading || alertsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Pending Approval"
              value={pendingCount}
              icon={<ClipboardList className="h-5 w-5" />}
              color="yellow"
            />
            <MetricCard
              title="Confirmed"
              value={confirmedCount}
              icon={<Clock className="h-5 w-5" />}
              color="cyan"
            />
            <MetricCard
              title="Total Queue"
              value={queue?.length ?? 0}
              icon={<Container className="h-5 w-5" />}
              color="purple"
            />
            <MetricCard
              title="Active Alerts"
              value={alerts?.length ?? 0}
              icon={<AlertTriangle className="h-5 w-5" />}
              color="red"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Pending */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Recent Pending Bookings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {!pendingCount ? (
                <EmptyState
                  title="No pending bookings"
                  description="All bookings have been reviewed"
                  icon={
                    <ClipboardList className="h-8 w-8 text-muted-foreground" />
                  }
                />
              ) : (
                <div className="divide-y divide-border/50">
                  {queue
                    ?.filter((b) => b.status === BookingStatus.PENDING)
                    .slice(0, 5)
                    .map((booking, i) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() =>
                          navigate(`/app/operator/bookings/${booking.id}`)
                        }
                        className="flex items-center justify-between px-4 py-3 hover:bg-foreground/5 cursor-pointer transition-colors"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            {booking.terminal?.name || 'Terminal'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDateTime(booking.createdAt)}
                          </p>
                        </div>
                        <StatusBadge status={booking.status} />
                      </motion.div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Latest Alerts</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {!alerts?.length ? (
                <EmptyState
                  title="No alerts"
                  description="Everything is running smoothly"
                  icon={
                    <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                  }
                />
              ) : (
                <div className="divide-y divide-border/50">
                  {alerts.slice(0, 6).map((alert, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 px-4 py-3"
                    >
                      <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {alert.type}
                          {alert.createdAt &&
                            ` · ${formatDateTime(alert.createdAt)}`}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
