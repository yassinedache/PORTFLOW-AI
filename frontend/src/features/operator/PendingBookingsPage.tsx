import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { PageTransition, EmptyState } from '@/components/shared';
import { TableSkeleton } from '@/components/shared/Skeletons';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { operatorApi } from '@/lib/api';
import { queryKeys } from '@/lib/constants';
import { formatDateTime } from '@/lib/utils';
import { BookingStatus, PriorityLevel, type Booking } from '@/types';

export default function PendingBookingsPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [rejectTarget, setRejectTarget] = useState<Booking | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const { data: queue, isLoading } = useQuery({
    queryKey: queryKeys.operatorQueue(),
    queryFn: () => operatorApi.getQueue(),
  });

  const pendingBookings = queue?.filter(
    (b) => b.status === BookingStatus.PENDING,
  );

  const approveMutation = useMutation({
    mutationFn: operatorApi.approveBooking,
    onSuccess: () => {
      toast.success('Booking approved');
      queryClient.invalidateQueries({ queryKey: ['operator', 'queue'] });
    },
    onError: () => toast.error('Failed to approve'),
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      operatorApi.rejectBooking(id, reason),
    onSuccess: () => {
      toast.success('Booking rejected');
      setRejectTarget(null);
      setRejectReason('');
      queryClient.invalidateQueries({ queryKey: ['operator', 'queue'] });
    },
    onError: () => toast.error('Failed to reject'),
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Pending Bookings</h1>
          <p className="text-sm text-muted-foreground">
            Review and approve or reject booking requests
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6">
                <TableSkeleton />
              </div>
            ) : !pendingBookings?.length ? (
              <EmptyState
                title="No pending bookings"
                description="All bookings have been reviewed"
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Terminal</TableHead>
                    <TableHead>Time Slot</TableHead>
                    <TableHead>Container</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Readiness</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingBookings.map((booking, i) => {
                    const isPriority =
                      (booking as any).priorityAccess?.level ===
                      PriorityLevel.PRIORITY;
                    return (
                      <motion.tr
                        key={booking.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className={`border-b border-border/50 cursor-pointer transition-colors hover:bg-foreground/5 ${
                          isPriority
                            ? 'ring-1 ring-yellow-500/30 bg-yellow-500/5'
                            : ''
                        }`}
                        onClick={() =>
                          navigate(`/app/operator/bookings/${booking.id}`)
                        }
                      >
                        <TableCell className="font-medium">
                          {booking.terminal?.name || '—'}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {booking.timeSlot
                            ? `${formatDateTime(booking.timeSlot.startTime)}`
                            : '—'}
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {booking.container?.containerNumber || '—'}
                        </TableCell>
                        <TableCell>
                          {isPriority ? (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Priority
                            </Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              Standard
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
                            className="flex items-center justify-end gap-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              size="sm"
                              variant="success"
                              disabled={approveMutation.isPending}
                              onClick={() => approveMutation.mutate(booking.id)}
                            >
                              {approveMutation.isPending ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                              )}
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              disabled={rejectMutation.isPending}
                              onClick={() => setRejectTarget(booking)}
                            >
                              <XCircle className="h-3.5 w-3.5 mr-1" />
                              Reject
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

        {/* Reject Dialog */}
        <Dialog
          open={!!rejectTarget}
          onOpenChange={() => {
            setRejectTarget(null);
            setRejectReason('');
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Booking</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Reason (optional)</Label>
                <Input
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Enter rejection reason..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setRejectTarget(null)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  disabled={rejectMutation.isPending}
                  onClick={() =>
                    rejectTarget &&
                    rejectMutation.mutate({
                      id: rejectTarget.id,
                      reason: rejectReason || undefined,
                    })
                  }
                >
                  {rejectMutation.isPending && (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  )}
                  Confirm Reject
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}
