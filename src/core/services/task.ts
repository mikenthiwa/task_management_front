import { api } from '@/core/services/api';
import { Task } from '@/core/common/interfaces/task';
import { ApiResponseWithData } from '@/core/common/interfaces/ApiResponse';

interface GetTasksQuery {
  pageNumber?: number;
  pageSize?: number;
  status?: string;
  assignedTo?: string;
}

interface TasksResponse {
  pageNumber: number;
  pageSize: number;
  count: number;
  totalPage: number;
  items: Task[];
}

export const taskAPI = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<TasksResponse, GetTasksQuery>({
      query: (params) => ({
        url: '/Tasks',
        method: 'GET',
        params: {
          pageNumber: params.pageNumber || 1,
          pageSize: params.pageSize || 10,
          status: params.status,
          assignedTo: params.assignedTo,
        },
      }),
      transformResponse: (response: ApiResponseWithData<TasksResponse>) =>
        response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: 'Tasks' as const, id })),
              { type: 'Tasks' as const, id: 'LIST' },
            ]
          : [{ type: 'Tasks' as const, id: 'LIST' }],
    }),
  }),
});

export const { useGetTasksQuery } = taskAPI;
export const {
  endpoints: { getTasks },
} = taskAPI;
