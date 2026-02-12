import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Loader2,
  Clock,
  Truck,
  AlertTriangle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { PageTransition, EmptyState } from '@/components/shared';
import { TableSkeleton } from '@/components/shared/Skeletons';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { operatorApi } from '@/lib/api';
import { queryKeys } from '@/lib/constants';
import { formatDateTime } from '@/lib/utils';
import { BookingStatus } from '@/types';

export default function ConfirmedBookingsPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: queue, isLoading } = useQuery({
    queryKey: queryKeys.operatorQueue(),
    queryFn: () => operatorApi.getQueue(),
  });

  const confirmedBookings = queue?.filter(
    (b) => b.status === BookingStatus.CONFIRMED,
  );

  const readinessMutation = useMutation({
    mutationFn: operatorApi.confirmReadiness,
    onSuccess: (data: any) => {
      toast.success('Readiness confirmed successfully');
      if (data?.warning) {
        toast.warning(data.warning, { duration: 6000 });
      }
      queryClient.invalidateQueries({ queryKey: ['operator', 'queue'] });
    },
    onError: (error) => {
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (isAxiosError(error)) {
        const data = error.response?.data;
        const status = error.response?.status;
        if (status === 409) {
          toast.info(data?.message || 'Readiness already confirmed');
          queryClient.invalidateQueries({ queryKey: ['operator', 'queue'] });
          return;
        }
        errorMessage = data?.message || data?.error || errorMessage;
      }
      toast.error('Cannot confirm readiness', {
        description: errorMessage,
        duration: 6000,
      });
    },
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Confirmed Bookings</h1>
          <p className="text-sm text-muted-foreground">
            Bookings awaiting readiness confirmation before gate access
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6">
                <TableSkeleton />
              </div>
            ) : !confirmedBookings?.length ? (
              <EmptyState
                title="No confirmed bookings"
                description="All confirmed bookings have been processed"
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Terminal</TableHead>
                    <TableHead>Time Slot</TableHead>
                    <TableHead>Container</TableHead>
                    <TableHead>Truck</TableHead>
                    <TableHead>Readiness</TableHead>
                    <TableHead>Approved</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {confirmedBookings.map((booking, i) => {
                    const hasTruck = !!booking.truck;
                    const slotExpired = booking.timeSlot
                      ? new Date() > new Date(booking.timeSlot.endTime)
                      : false;

                    return (
                      <motion.tr
                        key={booking.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className={`border-b border-border/50 cursor-pointer transition-colors hover:bg-foreground/5 ${
                          slotExpired ? 'opacity-60' : ''
                        }`}
                        onClick={() =>
                          navigate(`/app/operator/bookings/${booking.id}`)
                        }
                      >
                        <TableCell className="font-medium">
                          {booking.terminal?.name || '—'}
                        </TableCell>
                        <TableCell className="text-sm">
                          <div className="flex items-center gap-1.5">
                            {booking.timeSlot ? (
                              <>
                                <span className="text-muted-foreground">
                                  {formatDateTime(booking.timeSlot.startTime)}
                                </span>
                                {slotExpired && (
                                  <span title="Slot expired">
                                    <Clock className="h-3.5 w-3.5 text-red-400" />
                                  </span>
                                )}
                              </>
                            ) : (
                              '—'
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {booking.container?.containerNumber || '—'}
                        </TableCell>
                        <TableCell>
                          {hasTruck ? (
                            <span className="text-sm">
                              {booking.truck?.plate}
                            </span>
                          ) : (
                            <span
                              className="flex items-center gap-1 text-xs text-yellow-400"
                              title="Truck must be assigned for gate access"
                            >
                              <AlertTriangle className="h-3 w-3" />
                              Not assigned
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {booking.readinessScore != null ? (
                            <span
                              className={`text-sm font-semibold ${
                                booking.readinessScore >= 0.7
                                  ? 'text-emerald-400'
                                  : booking.readinessScore >= 0.4
                                    ? 'text-yellow-400'
                                    : 'text-red-400'
                              }`}
                            >
                              {Math.round(booking.readinessScore * 100)}%
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              —
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDateTime(booking.createdAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div
                            className="flex items-center justify-end"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              size="sm"
                              variant="glow"
                              disabled={
                                readinessMutation.isPending || slotExpired
                              }
                              onClick={() =>
                                readinessMutation.mutate(booking.id)
                              }
                            >
                              {readinessMutation.isPending ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
                              ) : (
                                <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                              )}
                              Confirm Readiness
                            </Button>
                          </div>
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
