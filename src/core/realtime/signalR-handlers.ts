import { Notification } from '@/core/common/interfaces/notification';
import { notificationAPI } from '@/core/services/notification';
import { Task } from '@/core/common/interfaces/task';
import { taskAPI } from '@/core/services/task';

export const notificationUpdateHandler = (data: Notification) => {
  return notificationAPI.util.updateQueryData(
    'getNotifications',
    { pageNumber: 1, pageSize: 5 },
    (draft) => {
      draft.items.unshift(data);
    }
  );
};

export const taskUpdateHandler = (data: Task) => {
  return taskAPI.util.updateQueryData(
    'getTasks',
    { pageNumber: 1, pageSize: 10 },
    (draft) => {
      const index = draft.items.findIndex((t) => t.id === data.id);
      if (index !== -1) draft.items[index] = data;
    }
  );
};
