import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Loader2,
  Truck,
  Container,
  Clock,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import { PageTransition, EmptyState, ErrorAlert } from '@/components/shared';
import { PageSkeleton } from '@/components/shared/Skeletons';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { operatorApi, carrierApi } from '@/lib/api';
import { queryKeys } from '@/lib/constants';
import { formatDateTime, formatCurrency } from '@/lib/utils';
import { BookingStatus, type Booking } from '@/types';

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: booking,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.booking(id!),
    queryFn: () => carrierApi.getBooking(id!),
    enabled: !!id,
  });

  const approveMutation = useMutation({
    mutationFn: operatorApi.approveBooking,
    onSuccess: () => {
      toast.success('Booking approved');
      queryClient.invalidateQueries({ queryKey: ['operator', 'queue'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.booking(id!) });
    },
    onError: () => toast.error('Failed to approve'),
  });

  const rejectMutation = useMutation({
    mutationFn: (bookingId: string) => operatorApi.rejectBooking(bookingId),
    onSuccess: () => {
      toast.success('Booking rejected');
      queryClient.invalidateQueries({ queryKey: ['operator', 'queue'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.booking(id!) });
    },
    onError: () => toast.error('Failed to reject'),
  });

  const readinessMutation = useMutation({
    mutationFn: operatorApi.confirmReadiness,
    onSuccess: () => {
      toast.success('Readiness confirmed');
      queryClient.invalidateQueries({ queryKey: ['operator', 'queue'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.booking(id!) });
    },
    onError: () => toast.error('Failed to confirm readiness'),
  });

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorAlert onRetry={refetch} />;
  if (!booking)
    return (
      <EmptyState
        title="Booking not found"
        description="It may have been removed"
      >
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </EmptyState>
    );

  const isPending = booking.status === BookingStatus.PENDING;
  const canConfirmReady = booking.status === BookingStatus.CONFIRMED;

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Booking Detail</h1>
            <p className="text-sm text-muted-foreground font-mono">
              {booking.id.slice(0, 8)}…
            </p>
          </div>
          <StatusBadge status={booking.status} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Booking Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InfoRow
                  icon={<MapPin className="h-4 w-4" />}
                  label="Terminal"
                  value={booking.terminal?.name || '—'}
                />
                <InfoRow
                  icon={<Clock className="h-4 w-4" />}
                  label="Time Slot"
                  value={
                    booking.timeSlot
                      ? `${formatDateTime(booking.timeSlot.startTime)} – ${formatDateTime(booking.timeSlot.endTime)}`
                      : '—'
                  }
                />
                <InfoRow
                  icon={<Truck className="h-4 w-4" />}
                  label="Truck"
                  value={booking.truck?.plate || 'Not assigned'}
                />
                <InfoRow
                  icon={<Container className="h-4 w-4" />}
                  label="Container"
                  value={booking.container?.containerNumber || 'Not assigned'}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <InfoRow
                  label="Price"
                  value={
                    booking.price != null ? formatCurrency(booking.price) : '—'
                  }
                />
                <InfoRow
                  label="Created"
                  value={formatDateTime(booking.createdAt)}
                />
              </div>

              {/* Readiness */}
              {booking.readinessScore != null && (
                <>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-cyan-400" />
                    <div>
                      <p className="text-sm font-medium">Readiness Score</p>
                      <p
                        className={`text-2xl font-bold ${
                          booking.readinessScore >= 0.7
                            ? 'text-emerald-400'
                            : booking.readinessScore >= 0.4
                              ? 'text-yellow-400'
                              : 'text-red-400'
                        }`}
                      >
                        {Math.round(booking.readinessScore * 100)}%
                      </p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Actions Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isPending && (
                <>
                  <Button
                    className="w-full"
                    variant="success"
                    disabled={approveMutation.isPending}
                    onClick={() => approveMutation.mutate(booking.id)}
                  >
                    {approveMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                    )}
                    Approve
                  </Button>
                  <Button
                    className="w-full"
                    variant="destructive"
                    disabled={rejectMutation.isPending}
                    onClick={() => rejectMutation.mutate(booking.id)}
                  >
                    {rejectMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-2" />
                    )}
                    Reject
                  </Button>
                </>
              )}

              {canConfirmReady && (
                <Button
                  className="w-full"
                  variant="glow"
                  disabled={readinessMutation.isPending}
                  onClick={() => readinessMutation.mutate(booking.id)}
                >
                  {readinessMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <ShieldCheck className="h-4 w-4 mr-2" />
                  )}
                  Confirm Readiness
                </Button>
              )}

              {!isPending && !canConfirmReady && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No actions available for this status
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      {icon && <span className="text-muted-foreground mt-0.5">{icon}</span>}
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
