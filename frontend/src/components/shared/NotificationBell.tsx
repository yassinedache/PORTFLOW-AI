import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Bell, Check, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { notificationApi, type Notification } from '@/lib/api/notification';
import { useAuthStore } from '@/hooks/useAuthStore';
import { subscribeToUser, getSocket } from '@/lib/socket';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

const typeColors: Record<string, string> = {
  BOOKING_PENDING: 'bg-yellow-500',
  BOOKING_APPROVED: 'bg-green-500',
  BOOKING_REJECTED: 'bg-red-500',
  PRIORITY_PURCHASED: 'bg-blue-500',
  PENALTY_APPLIED: 'bg-orange-500',
};

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  // Subscribe to user-specific notifications
  useEffect(() => {
    if (user?.id) {
      subscribeToUser(user.id);

      const socket = getSocket();
      const handleNewNotification = () => {
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
      };
      socket.on('notification:new', handleNewNotification);

      return () => {
        socket.off('notification:new', handleNewNotification);
      };
    }
  }, [user?.id, queryClient]);

  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationApi.getNotifications({ limit: 10 }),
    enabled: !!user,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const { data: unreadData } = useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: () => notificationApi.getUnreadCount(),
    enabled: !!user,
    refetchInterval: 15000, // Refetch every 15 seconds
  });

  const markAsReadMutation = useMutation({
    mutationFn: notificationApi.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: notificationApi.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const unreadCount = unreadData?.count ?? notifications?.unreadCount ?? 0;

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsReadMutation.mutate(notification.id);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4.5 w-4.5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-3 py-2">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto gap-1 p-1 text-xs text-muted-foreground"
              onClick={() => markAllAsReadMutation.mutate()}
            >
              <CheckCheck className="h-3 w-3" />
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {notifications?.data && notifications.data.length > 0 ? (
            notifications.data.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  'flex cursor-pointer flex-col items-start gap-1 px-3 py-2',
                  !notification.read && 'bg-muted/50',
                )}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex w-full items-start gap-2">
                  <div
                    className={cn(
                      'mt-1 h-2 w-2 shrink-0 rounded-full',
                      typeColors[notification.type] || 'bg-gray-500',
                    )}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium">
                        {notification.title}
                      </span>
                      {!notification.read && (
                        <Check className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                    <span className="text-[10px] text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
              No notifications yet
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
