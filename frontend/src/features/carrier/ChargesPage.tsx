import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, ChevronDown, ChevronRight } from 'lucide-react';
import { PageTransition, EmptyState, ErrorAlert } from '@/components/shared';
import { TableSkeleton } from '@/components/shared/Skeletons';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { carrierApi } from '@/lib/api';
import { queryKeys } from '@/lib/constants';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import type { Booking, ChargesBreakdown } from '@/types';

function ChargeRow({ booking, index }: { booking: Booking; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const { data: charges } = useQuery({
    queryKey: queryKeys.bookingCharges(booking.id),
    queryFn: () => carrierApi.getBookingCharges(booking.id),
    enabled: expanded,
  });

  return (
    <>
      <motion.tr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.02 }}
        className="border-b border-border/50 cursor-pointer hover:bg-muted/30"
        onClick={() => setExpanded(!expanded)}
      >
        <TableCell className="w-8">
          {expanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </TableCell>
        <TableCell className="font-medium">
          {booking.terminal?.name || '—'}
        </TableCell>
        <TableCell>
          <StatusBadge status={booking.status} />
        </TableCell>
        <TableCell className="text-muted-foreground">
          {formatDateTime(booking.createdAt)}
        </TableCell>
        <TableCell className="text-right font-semibold">
          {booking.price != null ? formatCurrency(booking.price) : '—'}
        </TableCell>
      </motion.tr>
      <AnimatePresence>
        {expanded && (
          <motion.tr
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <TableCell colSpan={5} className="bg-muted/20 p-0">
              {charges ? (
                <div className="px-8 py-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Slot Cost</span>
                    <span>{formatCurrency(charges.slotCost)}</span>
                  </div>
                  {charges.ecoDiscount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Eco Discount</span>
                      <span>-{formatCurrency(charges.ecoDiscount)}</span>
                    </div>
                  )}
                  {charges.priorityFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Priority Fee
                      </span>
                      <span>{formatCurrency(charges.priorityFee)}</span>
                    </div>
                  )}
                  {charges.penalties > 0 && (
                    <div className="flex justify-between text-red-400">
                      <span>Penalties</span>
                      <span>{formatCurrency(charges.penalties)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold border-t border-border/50 pt-1 mt-1">
                    <span>Total</span>
                    <span>{formatCurrency(charges.total)}</span>
                  </div>
                </div>
              ) : (
                <div className="px-8 py-3 text-sm text-muted-foreground">
                  Loading…
                </div>
              )}
            </TableCell>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
}

export default function ChargesPage() {
  const {
    data: bookings,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.myBookings,
    queryFn: carrierApi.getMyBookings,
  });

  if (isError)
    return (
      <PageTransition>
        <ErrorAlert onRetry={refetch} />
      </PageTransition>
    );

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Charges</h1>
          <p className="text-sm text-muted-foreground">
            View charges breakdown for each booking
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6">
                <TableSkeleton />
              </div>
            ) : !bookings?.length ? (
              <EmptyState
                title="No charges"
                description="Charges appear when you create bookings"
                icon={<DollarSign className="h-8 w-8 text-muted-foreground" />}
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8" />
                    <TableHead>Terminal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking, i) => (
                    <ChargeRow key={booking.id} booking={booking} index={i} />
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
