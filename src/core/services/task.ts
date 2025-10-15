import { api } from '@/core/services/api';
import { Task } from '@/core/common/interfaces/task';
import {
  ApiResponse,
  ApiResponseWithData,
} from '@/core/common/interfaces/ApiResponse';

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

interface AddTaskRequest {
  title: string;
  description?: string;
}

export const taskAPI = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<TasksResponse, GetTasksQuery>({
      query: (params) => {
        return {
          url: '/Tasks',
          method: 'GET',
          params: {
            pageNumber: params.pageNumber || 1,
            pageSize: params.pageSize || 10,
            status: params.status,
            assignedTo: params.assignedTo,
          },
        };
      },
      keepUnusedDataFor: 5,
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
    addTask: build.mutation<ApiResponse, AddTaskRequest>({
      query: (payload) => ({
        url: '/Tasks',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: ApiResponse) => response,
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation } = taskAPI;
export const {
  endpoints: { getTasks, addTask },
} = taskAPI;
