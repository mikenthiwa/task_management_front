enum NotificationType {
  TaskCreated = 0,
}

interface Action {
  actionUrl: string;
  actionLabel: string;
}

export interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  action?: Action;
  notificationType: NotificationType;
}
