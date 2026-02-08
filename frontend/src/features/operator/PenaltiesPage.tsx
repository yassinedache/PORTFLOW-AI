import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FileWarning, DollarSign, Clock, AlertCircle } from 'lucide-react';
import {
  PageTransition,
  EmptyState,
  MetricCard,
  ErrorAlert,
} from '@/components/shared';
import { TableSkeleton, CardSkeleton } from '@/components/shared/Skeletons';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { queryKeys } from '@/lib/constants';
import { formatDateTime, formatCurrency } from '@/lib/utils';
import { operatorApi } from '@/lib/api';
import { PenaltyType, type Penalty } from '@/types';

const penaltyTypeConfig: Record<PenaltyType, { label: string; color: string }> =
  {
    [PenaltyType.NO_SHOW]: { label: 'No-Show', color: 'text-red-400' },
    [PenaltyType.LATE]: { label: 'Late Arrival', color: 'text-yellow-400' },
  };

export default function PenaltiesPage() {
  const {
    data: penalties,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.penalties,
    queryFn: operatorApi.getPenalties,
  });

  const totalAmount = penalties?.reduce((sum, p) => sum + p.amount, 0) ?? 0;
  const noShowCount =
    penalties?.filter((p) => p.type === PenaltyType.NO_SHOW).length ?? 0;
  const lateCount =
    penalties?.filter((p) => p.type === PenaltyType.LATE).length ?? 0;

  if (isError) return <ErrorAlert onRetry={refetch} />;

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Penalties</h1>
          <p className="text-sm text-muted-foreground">
            View and manage penalties issued to carriers
          </p>
        </div>

        {/* Metrics */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              title="Total Penalties"
              value={formatCurrency(totalAmount)}
              icon={<DollarSign className="h-5 w-5" />}
              color="red"
            />
            <MetricCard
              title="No-Shows"
              value={noShowCount}
              icon={<AlertCircle className="h-5 w-5" />}
              color="red"
            />
            <MetricCard
              title="Late Arrivals"
              value={lateCount}
              icon={<Clock className="h-5 w-5" />}
              color="yellow"
            />
          </div>
        )}

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6">
                <TableSkeleton />
              </div>
            ) : !penalties?.length ? (
              <EmptyState
                title="No penalties"
                description="Penalties will appear when carriers violate booking rules"
                icon={<FileWarning className="h-8 w-8 text-muted-foreground" />}
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Booking</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {penalties.map((penalty, i) => {
                    const config = penaltyTypeConfig[penalty.type] || {
                      label: penalty.type,
                      color: 'text-muted-foreground',
                    };
                    return (
                      <motion.tr
                        key={penalty.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-b border-border/50"
                      >
                        <TableCell>
                          <span
                            className={`font-medium text-sm ${config.color}`}
                          >
                            {config.label}
                          </span>
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {penalty.bookingId?.slice(0, 8)}…
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                          {penalty.reason || '—'}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDateTime(penalty.createdAt)}
                        </TableCell>
                        <TableCell className="text-right font-semibold text-red-400">
                          {formatCurrency(penalty.amount)}
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
