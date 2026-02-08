import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ClipboardList, Truck, Container, CalendarClock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageTransition, MetricCard } from '@/components/shared';
import { PageSkeleton } from '@/components/shared/Skeletons';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { carrierApi } from '@/lib/api';
import { queryKeys } from '@/lib/constants';
import { formatDateTime } from '@/lib/utils';

export default function DashboardPage() {
  const navigate = useNavigate();

  const { data: bookings, isLoading: loadingBookings } = useQuery({
    queryKey: queryKeys.myBookings,
    queryFn: carrierApi.getMyBookings,
  });

  const { data: trucks } = useQuery({
    queryKey: queryKeys.trucks,
    queryFn: carrierApi.getTrucks,
  });

  const { data: containers } = useQuery({
    queryKey: queryKeys.containers,
    queryFn: carrierApi.getContainers,
  });

  if (loadingBookings) return <PageSkeleton />;

  const pending = bookings?.filter((b) => b.status === 'PENDING').length || 0;
  const confirmed =
    bookings?.filter((b) => b.status === 'CONFIRMED').length || 0;
  const recentBookings = bookings?.slice(0, 5) || [];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Carrier Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your fleet and bookings
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Bookings"
            value={bookings?.length || 0}
            subtitle={`${pending} pending`}
            icon={<ClipboardList className="h-5 w-5" />}
            glowColor="rgba(59, 130, 246, 0.15)"
          />
          <MetricCard
            title="Confirmed"
            value={confirmed}
            icon={<CalendarClock className="h-5 w-5" />}
            glowColor="rgba(16, 185, 129, 0.15)"
          />
          <MetricCard
            title="Trucks"
            value={trucks?.length || 0}
            icon={<Truck className="h-5 w-5" />}
            glowColor="rgba(245, 158, 11, 0.15)"
          />
          <MetricCard
            title="Containers"
            value={containers?.length || 0}
            icon={<Container className="h-5 w-5" />}
            glowColor="rgba(99, 102, 241, 0.15)"
          />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Bookings</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/app/carrier/bookings')}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBookings.map((booking, i) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() =>
                    navigate(`/app/carrier/bookings/${booking.id}`)
                  }
                  className="flex cursor-pointer items-center justify-between rounded-lg bg-secondary/30 p-4 transition-all hover:bg-secondary/50"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {booking.terminal?.name || 'Terminal'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {booking.timeSlot
                        ? formatDateTime(booking.timeSlot.startTime)
                        : formatDateTime(booking.createdAt)}
                    </p>
                  </div>
                  <StatusBadge status={booking.status} />
                </motion.div>
              ))}
              {!recentBookings.length && (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No bookings yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
