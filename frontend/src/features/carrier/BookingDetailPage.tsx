import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  QrCode,
  CheckCircle2,
  Clock,
  Rocket,
  Ban,
  Shield,
  Zap,
  Link2,
} from 'lucide-react';
// Lazy-load QR code component to keep qrcode.react in its own chunk
const QRCodeSVG = lazy(() =>
  import('qrcode.react').then((m) => ({ default: m.QRCodeSVG })),
);
import { PageTransition, StatusBadge, RiskBadge } from '@/components/shared';
import { PageSkeleton } from '@/components/shared/Skeletons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { carrierApi } from '@/lib/api';
import { queryKeys } from '@/lib/constants';
import { formatDateTime, formatCurrency } from '@/lib/utils';
import { BookingStatus, PriorityLevel } from '@/types';

const statusSteps = [
  { key: BookingStatus.PENDING, label: 'Pending', icon: Clock },
  { key: BookingStatus.CONFIRMED, label: 'Confirmed', icon: CheckCircle2 },
  { key: BookingStatus.READY_TO_GO, label: 'Ready to Go', icon: Rocket },
  { key: BookingStatus.CONSUMED, label: 'Consumed', icon: CheckCircle2 },
];

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: booking, isLoading } = useQuery({
    queryKey: queryKeys.booking(id!),
    queryFn: () => carrierApi.getBooking(id!),
    enabled: !!id,
  });

  const { data: charges } = useQuery({
    queryKey: queryKeys.bookingCharges(id!),
    queryFn: () => carrierApi.getBookingCharges(id!),
    enabled: !!id,
  });

  const { data: proofs } = useQuery({
    queryKey: queryKeys.proofs(id!),
    queryFn: () => carrierApi.getProofs(id!),
    enabled: !!id,
  });

  const cancelBooking = useMutation({
    mutationFn: () => carrierApi.cancelBooking(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.booking(id!) });
      queryClient.invalidateQueries({ queryKey: queryKeys.myBookings });
      toast.success('Booking cancelled');
    },
    onError: () => toast.error('Failed to cancel booking'),
  });

  const purchasePriority = useMutation({
    mutationFn: () =>
      carrierApi.purchasePriority(id!, { level: PriorityLevel.PRIORITY }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.booking(id!) });
      queryClient.invalidateQueries({
        queryKey: queryKeys.bookingCharges(id!),
      });
      toast.success('Priority purchased!');
    },
    onError: () => toast.error('Failed to purchase priority'),
  });

  if (isLoading || !booking) return <PageSkeleton />;

  const currentStep = statusSteps.findIndex((s) => s.key === booking.status);
  const showQr =
    booking.qrToken &&
    [BookingStatus.CONFIRMED, BookingStatus.READY_TO_GO].includes(
      booking.status,
    );
  const isReadyToGo = booking.status === BookingStatus.READY_TO_GO;

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Booking Details</h1>
            <p className="text-sm text-muted-foreground">
              {booking.terminal?.name || 'Terminal'} —{' '}
              {formatDateTime(booking.createdAt)}
            </p>
          </div>
          <div className="flex gap-2">
            {booking.status === BookingStatus.PENDING && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => cancelBooking.mutate()}
              >
                <Ban className="mr-1 h-3 w-3" />
                Cancel
              </Button>
            )}
            {booking.status === BookingStatus.CONFIRMED && (
              <Button
                variant="glow"
                size="sm"
                onClick={() => purchasePriority.mutate()}
              >
                <Zap className="mr-1 h-3 w-3" />
                Priority Access
              </Button>
            )}
          </div>
        </div>

        {/* Status Timeline */}
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              {statusSteps.map((step, i) => {
                const isActive = i <= currentStep;
                const Icon = step.icon;
                const isCurrent = step.key === booking.status;

                return (
                  <div key={step.key} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: isCurrent ? 1.1 : 1 }}
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                          isActive
                            ? isCurrent && isReadyToGo
                              ? 'bg-accent/20 text-accent animate-pulse-glow'
                              : 'bg-primary/20 text-primary'
                            : 'bg-secondary text-muted-foreground'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>
                      <span
                        className={`mt-2 text-xs ${
                          isActive
                            ? 'font-medium text-foreground'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {i < statusSteps.length - 1 && (
                      <div
                        className={`mx-2 h-0.5 flex-1 rounded-full ${
                          i < currentStep ? 'bg-primary' : 'bg-secondary'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Info */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <StatusBadge status={booking.status} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Terminal</span>
                <span>{booking.terminal?.name || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Time Slot</span>
                <span>
                  {booking.timeSlot
                    ? formatDateTime(booking.timeSlot.startTime)
                    : '—'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Container</span>
                <span className="font-mono">
                  {booking.container?.containerNumber || '—'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Truck</span>
                <span className="font-mono">{booking.truck?.plate || '—'}</span>
              </div>
              {booking.readinessScore != null && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Readiness Score</span>
                  <RiskBadge
                    riskLevel={
                      booking.readinessScore > 70
                        ? 'LOW'
                        : booking.readinessScore > 40
                          ? 'MEDIUM'
                          : 'HIGH'
                    }
                    probability={booking.readinessScore}
                  />
                </div>
              )}
              {booking.price != null && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-semibold">
                    {formatCurrency(booking.price)}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* QR Code */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-4 w-4 text-primary" />
                QR Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showQr ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div
                    className={`rounded-2xl bg-white p-4 ${isReadyToGo ? 'animate-pulse-glow' : ''}`}
                  >
                    <Suspense
                      fallback={
                        <div className="h-[180px] w-[180px] animate-shimmer rounded" />
                      }
                    >
                      <QRCodeSVG
                        value={booking.qrToken!}
                        size={180}
                        level="H"
                      />
                    </Suspense>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Show this QR code at the gate
                  </p>
                  {isReadyToGo && (
                    <Badge variant="accent" className="animate-pulse">
                      <Rocket className="mr-1 h-3 w-3" />
                      READY TO GO
                    </Badge>
                  )}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center py-8 text-sm text-muted-foreground">
                  <QrCode className="mb-2 h-12 w-12 opacity-20" />
                  <p>QR code will appear once booking is confirmed</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Charges */}
        {charges && (
          <Card>
            <CardHeader>
              <CardTitle>Charges Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 rounded-lg bg-secondary/30 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Slot Cost</span>
                  <span>{formatCurrency(charges.slotCost)}</span>
                </div>
                {charges.ecoDiscount > 0 && (
                  <div className="flex justify-between text-sm text-success">
                    <span>Eco Discount</span>
                    <span>-{formatCurrency(charges.ecoDiscount)}</span>
                  </div>
                )}
                {charges.priorityFee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Priority Fee</span>
                    <span>{formatCurrency(charges.priorityFee)}</span>
                  </div>
                )}
                {charges.penalties > 0 && (
                  <div className="flex justify-between text-sm text-destructive">
                    <span>Penalties</span>
                    <span>{formatCurrency(charges.penalties)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-sm font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(charges.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Blockchain Proofs */}
        {proofs && proofs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-primary" />
                Blockchain Proofs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {proofs.map((proof) => (
                  <div
                    key={proof.id}
                    className="flex items-center justify-between rounded-lg bg-secondary/30 p-3"
                  >
                    <div>
                      <p className="text-xs font-medium">{proof.entityType}</p>
                      <p className="font-mono text-xs text-muted-foreground">
                        {proof.hash.substring(0, 24)}...
                      </p>
                    </div>
                    <Badge variant="success">
                      <Shield className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageTransition>
  );
}
