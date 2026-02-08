import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Bell, Clock, Info } from 'lucide-react';
import { PageTransition, EmptyState } from '@/components/shared';
import { CardSkeleton } from '@/components/shared/Skeletons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { operatorApi } from '@/lib/api';
import { queryKeys } from '@/lib/constants';
import { formatDateTime } from '@/lib/utils';

const alertTypeConfig: Record<
  string,
  { icon: React.ReactNode; color: string; bg: string }
> = {
  CONGESTION: {
    icon: <AlertTriangle className="h-4 w-4" />,
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/30',
  },
  CAPACITY: {
    icon: <AlertTriangle className="h-4 w-4" />,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/30',
  },
  RISK: {
    icon: <AlertTriangle className="h-4 w-4" />,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/30',
  },
};

const defaultAlertConfig = {
  icon: <Info className="h-4 w-4" />,
  color: 'text-cyan-400',
  bg: 'bg-cyan-500/10 border-cyan-500/30',
};

export default function AlertsPage() {
  const { data: alerts, isLoading } = useQuery({
    queryKey: queryKeys.operatorAlerts(),
    queryFn: () => operatorApi.getAlerts(),
    refetchInterval: 15_000, // Poll every 15s
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Alerts</h1>
            <p className="text-sm text-muted-foreground">
              Real-time terminal alerts and notifications
            </p>
          </div>
          {alerts && alerts.length > 0 && (
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              <Bell className="h-3 w-3 mr-1" />
              {alerts.length} active
            </Badge>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : !alerts?.length ? (
          <Card>
            <CardContent className="p-6">
              <EmptyState
                title="No active alerts"
                description="Everything is running smoothly. Alerts will appear here when issues are detected."
                icon={<Bell className="h-8 w-8 text-muted-foreground" />}
              />
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {alerts.map((alert, i) => {
                const config =
                  alertTypeConfig[alert.type?.toUpperCase()] ??
                  defaultAlertConfig;
                return (
                  <motion.div
                    key={`${alert.type}-${alert.createdAt}-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card
                      className={`border ${config.bg} transition-all hover:scale-[1.005]`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`shrink-0 mt-0.5 ${config.color}`}>
                            {config.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                variant="outline"
                                className={`text-[10px] uppercase tracking-wider ${config.color}`}
                              >
                                {alert.type}
                              </Badge>
                              {alert.createdAt && (
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {formatDateTime(alert.createdAt)}
                                </span>
                              )}
                            </div>
                            <p className="text-sm">{alert.message}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
