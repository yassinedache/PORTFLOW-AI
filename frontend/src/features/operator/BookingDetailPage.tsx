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
  AlertTriangle,
  ArrowRight,
  CircleDot,
  Package,
} from 'lucide-react';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
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
import { BookingStatus, ContainerStatus, type Booking } from '@/types';

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

  const containerStatusMutation = useMutation({
    mutationFn: ({
      containerId,
      status,
    }: {
      containerId: string;
      status: string;
    }) =>
      operatorApi.updateContainerStatus(containerId, { status: status as any }),
    onSuccess: (_data, variables) => {
      toast.success(`Container status updated to ${variables.status}`);
      queryClient.invalidateQueries({ queryKey: queryKeys.booking(id!) });
      queryClient.invalidateQueries({ queryKey: ['operator', 'queue'] });
    },
    onError: (error) => {
      let msg = 'Failed to update container status';
      if (isAxiosError(error)) {
        msg = error.response?.data?.message || msg;
      }
      toast.error(msg);
    },
  });

  const readinessMutation = useMutation({
    mutationFn: operatorApi.confirmReadiness,
    onSuccess: (data) => {
      toast.success('Readiness confirmed successfully');
      if (data?.warning) {
        toast.warning(data.warning, { duration: 6000 });
      }
      queryClient.invalidateQueries({ queryKey: ['operator', 'queue'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.booking(id!) });
    },
    onError: (error) => {
      // FR-6: Extract meaningful error message from backend
      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (isAxiosError(error)) {
        const data = error.response?.data;
        const status = error.response?.status;

        if (status === 409) {
          // Already confirmed — update UI to reflect real state
          toast.info(data?.message || 'Readiness has already been confirmed');
          queryClient.invalidateQueries({ queryKey: queryKeys.booking(id!) });
          return;
        }

        // Use backend message if available
        errorMessage = data?.message || data?.error || errorMessage;
      }

      toast.error('Cannot confirm readiness', {
        description: errorMessage,
        duration: 6000,
      });
    },
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
  const isReadyToGo = booking.status === BookingStatus.READY_TO_GO;

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

              {/* Container Status */}
              {booking.container && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">Container Status</p>
                      </div>
                      <ContainerStatusBadge status={booking.container.status} />
                    </div>

                    {/* Status progression */}
                    <div className="flex items-center gap-1 text-xs">
                      {['NOT_ARRIVED', 'IN_YARD', 'READY', 'RELEASED'].map(
                        (step, idx, arr) => (
                          <span key={step} className="flex items-center gap-1">
                            <span
                              className={`px-2 py-0.5 rounded ${
                                booking.container!.status === step
                                  ? 'bg-primary/20 text-primary font-semibold'
                                  : arr.indexOf(booking.container!.status) > idx
                                    ? 'text-emerald-400'
                                    : 'text-muted-foreground'
                              }`}
                            >
                              {step.replace('_', ' ')}
                            </span>
                            {idx < arr.length - 1 && (
                              <ArrowRight className="h-3 w-3 text-muted-foreground/50" />
                            )}
                          </span>
                        ),
                      )}
                    </div>

                    {/* Quick advance button */}
                    {booking.container.status !== ContainerStatus.READY &&
                      booking.container.status !== ContainerStatus.RELEASED && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          disabled={containerStatusMutation.isPending}
                          onClick={() => {
                            const next =
                              booking.container!.status ===
                              ContainerStatus.NOT_ARRIVED
                                ? ContainerStatus.IN_YARD
                                : ContainerStatus.READY;
                            containerStatusMutation.mutate({
                              containerId: booking.container!.id,
                              status: next,
                            });
                          }}
                        >
                          {containerStatusMutation.isPending ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
                          ) : (
                            <ArrowRight className="h-3.5 w-3.5 mr-1" />
                          )}
                          Advance to{' '}
                          {booking.container.status ===
                          ContainerStatus.NOT_ARRIVED
                            ? 'In Yard'
                            : 'Ready'}
                        </Button>
                      )}
                  </div>
                </>
              )}

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
                <>
                  {/* Readiness Checklist */}
                  <div className="space-y-2 rounded-md border border-border/50 bg-secondary/20 p-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Readiness Checklist
                    </p>
                    <ChecklistItem
                      label="Container assigned"
                      ok={!!booking.container}
                    />
                    <ChecklistItem
                      label="Container status: READY"
                      ok={booking.container?.status === ContainerStatus.READY}
                    />
                    <ChecklistItem
                      label="Truck assigned"
                      ok={!!booking.truck}
                      warn={!booking.truck}
                    />
                    <ChecklistItem
                      label="Slot not expired"
                      ok={
                        !booking.timeSlot ||
                        new Date() <= new Date(booking.timeSlot.endTime)
                      }
                    />
                  </div>

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
                </>
              )}

              {isReadyToGo && (
                <div className="flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-3 text-sm text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Readiness confirmed
                </div>
              )}

              {!isPending && !canConfirmReady && !isReadyToGo && (
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

function ContainerStatusBadge({ status }: { status: string }) {
  const config: Record<string, { color: string; label: string }> = {
    NOT_ARRIVED: {
      color: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
      label: 'Not Arrived',
    },
    IN_YARD: {
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      label: 'In Yard',
    },
    READY: {
      color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      label: 'Ready',
    },
    RELEASED: {
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      label: 'Released',
    },
  };
  const c = config[status] || config.NOT_ARRIVED;
  return (
    <Badge variant="outline" className={`${c.color} text-xs`}>
      <CircleDot className="h-3 w-3 mr-1" />
      {c.label}
    </Badge>
  );
}

function ChecklistItem({
  label,
  ok,
  warn,
}: {
  label: string;
  ok: boolean;
  warn?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 text-xs">
      {ok ? (
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
      ) : warn ? (
        <AlertTriangle className="h-3.5 w-3.5 text-yellow-400 shrink-0" />
      ) : (
        <XCircle className="h-3.5 w-3.5 text-red-400 shrink-0" />
      )}
      <span
        className={
          ok
            ? 'text-muted-foreground'
            : warn
              ? 'text-yellow-400'
              : 'text-red-400'
        }
      >
        {label}
      </span>
    </div>
  );
}
