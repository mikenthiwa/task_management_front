import { api } from '@/core/services/api';
import { ApiResponseWithData } from '@/core/common/interfaces/ApiResponse';
import { PaginatedResult } from '@/core/common/interfaces/pagination';
import { Notification } from '@/core/common/interfaces/notification';

interface NotificationQuery {
  pageNumber?: number;
  pageSize?: number;
  userId?: string;
}

export const notificationAPI = api.injectEndpoints({
  endpoints: (build) => {
    const endpointUrl = '/notifications';
    return {
      getNotifications: build.query<
        PaginatedResult<Notification>,
        NotificationQuery
      >({
        query: (params: NotificationQuery) => {
          return {
            url: `${endpointUrl}/user/${params.userId}`,
            method: 'GET',
            params: {
              pageNumber: params.pageNumber || 1,
              pageSize: params.pageSize || 10,
            },
          };
        },
        keepUnusedDataFor: 5,
        transformResponse: (
          response: ApiResponseWithData<PaginatedResult<Notification>>
        ) => {
          return response.data;
        },
        providesTags: (result) =>
          result
            ? [
                ...result.items.map(({ id }) => ({
                  type: 'Notifications' as const,
                  id,
                })),
                { type: 'Notifications' as const, id: 'LIST' },
              ]
            : [{ type: 'Notifications' as const, id: 'LIST' }],
      }),
      markAllAsRead: build.mutation<void, { userId: string }>({
        query: ({ userId }) => ({
          url: `${endpointUrl}/mark-all-as-read`,
          method: 'POST',
          body: { userId },
        }),
        invalidatesTags: [{ type: 'Notifications' as const, id: 'LIST' }],
      }),
    };
  },
});

export const { useGetNotificationsQuery, useMarkAllAsReadMutation } =
  notificationAPI;
export const {
  endpoints: { getNotifications, markAllAsRead },
} = notificationAPI;
