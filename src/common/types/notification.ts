export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number; // Duration in milliseconds, undefined means it won't auto-dismiss
  createdAt: string;
}

export interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}
