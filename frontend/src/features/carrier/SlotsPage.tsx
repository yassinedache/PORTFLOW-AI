import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { CalendarClock, Leaf, TrendingUp } from 'lucide-react';
import { PageTransition, EmptyState, PriceBadge } from '@/components/shared';
import { PageSkeleton } from '@/components/shared/Skeletons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { adminApi, carrierApi } from '@/lib/api';
import { queryKeys } from '@/lib/constants';
import { formatTime, formatDate } from '@/lib/utils';
import type { SlotAvailability, SlotPricing } from '@/types';

export default function SlotsPage() {
  const [terminalId, setTerminalId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]!);
  const [selectedSlot, setSelectedSlot] = useState<SlotAvailability | null>(
    null,
  );

  const { data: terminals } = useQuery({
    queryKey: queryKeys.terminals,
    queryFn: adminApi.getTerminals,
  });

  const { data: slots, isLoading: loadingSlots } = useQuery({
    queryKey: queryKeys.slotsAvailability(terminalId, date),
    queryFn: () => carrierApi.getAvailability(terminalId, date),
    enabled: !!terminalId && !!date,
  });

  const { data: pricing } = useQuery({
    queryKey: queryKeys.slotPricing(selectedSlot?.id || ''),
    queryFn: () => carrierApi.getSlotPricing(selectedSlot!.id),
    enabled: !!selectedSlot,
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Time Slots</h1>
          <p className="text-sm text-muted-foreground">
            Browse available slots and pricing
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="flex flex-wrap items-end gap-4 py-4">
            <div className="w-60 space-y-2">
              <Label>Terminal</Label>
              <Select value={terminalId} onValueChange={setTerminalId}>
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
            <div className="w-48 space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Slot Grid */}
          <div className="space-y-4 lg:col-span-2">
            {loadingSlots ? (
              <PageSkeleton />
            ) : !slots?.length ? (
              <Card>
                <CardContent>
                  <EmptyState
                    title={
                      terminalId ? 'No slots available' : 'Select a terminal'
                    }
                    description={
                      terminalId
                        ? 'Try a different date'
                        : 'Choose a terminal and date to see available slots'
                    }
                    icon={
                      <CalendarClock className="h-8 w-8 text-muted-foreground" />
                    }
                  />
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {slots.map((slot, i) => {
                  const pct =
                    slot.capacity > 0
                      ? (slot.bookedCount / slot.capacity) * 100
                      : 0;
                  const isSelected = selectedSlot?.id === slot.id;

                  return (
                    <motion.div
                      key={slot.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      whileHover={{ y: -2 }}
                      onClick={() => setSelectedSlot(slot)}
                      className={`glass cursor-pointer rounded-xl p-4 transition-all ${
                        isSelected ? 'glow-border ring-1 ring-primary/30' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">
                          {formatTime(slot.startTime)} –{' '}
                          {formatTime(slot.endTime)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {slot.availableCount}/{slot.capacity}
                        </span>
                      </div>
                      {/* Congestion Bar */}
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.5, delay: i * 0.03 }}
                          className={`h-full rounded-full ${
                            pct > 80
                              ? 'bg-destructive'
                              : pct > 50
                                ? 'bg-warning'
                                : 'bg-success'
                          }`}
                        />
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {pct.toFixed(0)}% booked
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pricing Panel */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Slot Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedSlot && pricing ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Time</p>
                      <p className="font-medium">
                        {formatTime(selectedSlot.startTime)} –{' '}
                        {formatTime(selectedSlot.endTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="font-medium">
                        {formatDate(selectedSlot.startTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Availability
                      </p>
                      <p className="font-medium">
                        {selectedSlot.availableCount} / {selectedSlot.capacity}{' '}
                        slots
                      </p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Base Price
                        </span>
                        <span>${pricing.basePrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Multiplier
                        </span>
                        <span>{pricing.multiplier.toFixed(2)}x</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold border-t border-border/50 pt-2">
                        <span>Final Price</span>
                        <PriceBadge
                          price={pricing.finalPrice}
                          isEcoSlot={pricing.isEcoSlot}
                        />
                      </div>
                      {pricing.isEcoSlot && (
                        <div className="flex items-center gap-1.5 text-xs text-success">
                          <Leaf className="h-3 w-3" />
                          Eco-friendly slot — discounted!
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {pricing.reason}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    Select a slot to see pricing
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
