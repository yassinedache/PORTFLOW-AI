import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { History, CheckCircle2, XCircle } from 'lucide-react';
import { PageTransition, EmptyState } from '@/components/shared';
import { TableSkeleton } from '@/components/shared/Skeletons';
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
import { gateApi } from '@/lib/api';
import { queryKeys } from '@/lib/constants';
import { formatDateTime } from '@/lib/utils';
import { GateAccessResult } from '@/types';

export default function HistoryPage() {
  const { data: logs, isLoading } = useQuery({
    queryKey: queryKeys.gateScanHistory,
    queryFn: gateApi.getHistory,
    refetchInterval: 10_000,
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Scan History</h1>
          <p className="text-sm text-muted-foreground">
            Recent gate access scans
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6">
                <TableSkeleton />
              </div>
            ) : !logs?.length ? (
              <EmptyState
                title="No scan history"
                description="Scans will appear here after you verify bookings"
                icon={<History className="h-8 w-8 text-muted-foreground" />}
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Result</TableHead>
                    <TableHead>Gate</TableHead>
                    <TableHead>Booking</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log, i) => {
                    const isAllowed = log.result === GateAccessResult.ALLOWED;
                    return (
                      <motion.tr
                        key={log.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.02 }}
                        className="border-b border-border/50"
                      >
                        <TableCell>
                          <Badge
                            className={
                              isAllowed
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                : 'bg-red-500/20 text-red-400 border-red-500/30'
                            }
                          >
                            {isAllowed ? (
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                            ) : (
                              <XCircle className="h-3 w-3 mr-1" />
                            )}
                            {isAllowed ? 'Allowed' : 'Denied'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm font-medium">
                          {log.gate?.name || log.gateId?.slice(0, 8) || '—'}
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {log.bookingId?.slice(0, 8)}…
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                          {log.reason || '—'}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDateTime(log.createdAt)}
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
