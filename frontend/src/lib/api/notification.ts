import { apiClient } from '../apiClient';

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  bookingId?: string;
  booking?: {
    id: string;
    status: string;
  };
  read: boolean;
  createdAt: string;
}

export interface NotificationsResponse {
  data: Notification[];
  unreadCount: number;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const notificationApi = {
  getNotifications: async (params?: {
    page?: number;
    limit?: number;
    unreadOnly?: boolean;
  }): Promise<NotificationsResponse> => {
    const res = await apiClient.get('/notifications', { params });
    return res.data;
  },

  getUnreadCount: async (): Promise<{ count: number }> => {
    const res = await apiClient.get('/notifications/unread-count');
    return res.data;
  },

  markAsRead: async (id: string): Promise<void> => {
    await apiClient.put(`/notifications/${id}/read`);
  },

  markAllAsRead: async (): Promise<void> => {
    await apiClient.put('/notifications/mark-all-read');
  },
};
