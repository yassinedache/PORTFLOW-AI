import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ClipboardList, Plus, Eye } from 'lucide-react';
import {
  PageTransition,
  EmptyState,
  StatusBadge,
  ErrorAlert,
} from '@/components/shared';
import { TableSkeleton } from '@/components/shared/Skeletons';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { carrierApi, adminApi } from '@/lib/api';
import { queryKeys } from '@/lib/constants';
import { formatDateTime, formatCurrency } from '@/lib/utils';

export default function BookingsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    terminalId: '',
    timeSlotId: '',
    containerId: '',
    truckId: '',
    date: new Date().toISOString().split('T')[0]!,
  });

  const {
    data: bookings,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.myBookings,
    queryFn: carrierApi.getMyBookings,
  });

  const { data: terminals } = useQuery({
    queryKey: queryKeys.terminals,
    queryFn: adminApi.getTerminals,
  });

  const { data: trucks } = useQuery({
    queryKey: queryKeys.trucks,
    queryFn: carrierApi.getTrucks,
  });

  const { data: containers } = useQuery({
    queryKey: queryKeys.containers,
    queryFn: carrierApi.getContainers,
  });

  const { data: slots } = useQuery({
    queryKey: queryKeys.slotsAvailability(form.terminalId, form.date),
    queryFn: () => carrierApi.getAvailability(form.terminalId, form.date),
    enabled: !!form.terminalId && !!form.date,
  });

  const createBooking = useMutation({
    mutationFn: carrierApi.createBooking,
    onSuccess: (booking) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.myBookings });
      setShowCreate(false);
      toast.success('Booking created');
      navigate(`/app/carrier/bookings/${booking.id}`);
    },
    onError: () => toast.error('Failed to create booking'),
  });

  if (isError) return <ErrorAlert onRetry={refetch} />;

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Bookings</h1>
            <p className="text-sm text-muted-foreground">
              Your booking history
            </p>
          </div>
          <Button variant="glow" onClick={() => setShowCreate(true)}>
            <Plus className="h-4 w-4" />
            New Booking
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6">
                <TableSkeleton />
              </div>
            ) : !bookings?.length ? (
              <EmptyState
                title="No bookings yet"
                description="Create your first booking"
                icon={
                  <ClipboardList className="h-8 w-8 text-muted-foreground" />
                }
                action={
                  <Button variant="outline" onClick={() => setShowCreate(true)}>
                    <Plus className="mr-1 h-4 w-4" />
                    New Booking
                  </Button>
                }
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Terminal</TableHead>
                    <TableHead>Time Slot</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="w-16" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking, i) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className="cursor-pointer border-b border-border/50 transition-colors hover:bg-muted/30"
                      onClick={() =>
                        navigate(`/app/carrier/bookings/${booking.id}`)
                      }
                    >
                      <TableCell className="font-medium">
                        {booking.terminal?.name || '—'}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {booking.timeSlot
                          ? formatDateTime(booking.timeSlot.startTime)
                          : '—'}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={booking.status} />
                      </TableCell>
                      <TableCell>
                        {booking.price != null
                          ? formatCurrency(booking.price)
                          : '—'}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDateTime(booking.createdAt)}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create Booking Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>New Booking</DialogTitle>
            <DialogDescription>
              Select truck, container, and time slot
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Terminal</Label>
              <Select
                value={form.terminalId}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, terminalId: v, timeSlotId: '' }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select terminal" />
                </SelectTrigger>
                <SelectContent>
                  {terminals?.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    date: e.target.value,
                    timeSlotId: '',
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Time Slot</Label>
              <Select
                value={form.timeSlotId}
                onValueChange={(v) => setForm((f) => ({ ...f, timeSlotId: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select slot" />
                </SelectTrigger>
                <SelectContent>
                  {slots
                    ?.filter((s) => s.availableCount > 0)
                    .map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {formatDateTime(s.startTime)} — {s.availableCount}{' '}
                        available
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Container</Label>
              <Select
                value={form.containerId}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, containerId: v }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select container" />
                </SelectTrigger>
                <SelectContent>
                  {containers?.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.containerNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Truck (optional)</Label>
              <Select
                value={form.truckId}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, truckId: v === 'none' ? '' : v }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="No truck selected" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No truck</SelectItem>
                  {trucks?.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.plate}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>
              Cancel
            </Button>
            <Button
              variant="glow"
              onClick={() =>
                createBooking.mutate({
                  terminalId: form.terminalId,
                  timeSlotId: form.timeSlotId,
                  containerId: form.containerId,
                  truckId: form.truckId || undefined,
                })
              }
              disabled={
                !form.terminalId || !form.timeSlotId || !form.containerId
              }
            >
              Create Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
}
