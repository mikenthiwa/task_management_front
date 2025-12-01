enum NotificationType {
  TaskCreated = 0,
}

export interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  notificationType: NotificationType;
}
