import { api } from '@/core/services/api';
import {
  IAssignTaskPayload,
  IAssignTaskResponse,
  Task,
} from '@/core/common/interfaces/task';
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
  endpoints: (build) => {
    const endpointUrl = '/tasks';
    return {
      getTasks: build.query<TasksResponse, GetTasksQuery>({
        query: (params) => {
          return {
            url: endpointUrl,
            method: 'GET',
            params: {
              pageNumber: params.pageNumber || 1,
              pageSize: params.pageSize || 10,
              status: params.status,
              assignedTo: params.assignedTo,
            },
          };
        },
        // keepUnusedDataFor: 5,
        transformResponse: (response: ApiResponseWithData<TasksResponse>) =>
          response.data,
        providesTags: (result) =>
          result
            ? [
                ...result.items.map(({ id }) => ({
                  type: 'Tasks' as const,
                  id,
                })),
                { type: 'Tasks' as const, id: 'LIST' },
              ]
            : [{ type: 'Tasks' as const, id: 'LIST' }],
      }),
      addTask: build.mutation<ApiResponse, AddTaskRequest>({
        query: (payload) => ({
          url: endpointUrl,
          method: 'POST',
          body: payload,
        }),
        transformResponse: (response: ApiResponse) => response,
        invalidatesTags: [
          { type: 'Tasks', id: 'LIST' },
          // { type: 'Notifications' as const, id: 'LIST' },
        ],
      }),
      assignTask: build.mutation<IAssignTaskResponse, IAssignTaskPayload>({
        query: (payload) => ({
          url: `${endpointUrl}/${payload.taskId}/assign`,
          method: 'POST',
          body: { assignedId: payload.assignedId },
        }),
        transformResponse: (
          response: ApiResponseWithData<IAssignTaskResponse>
        ) => response.data,
        invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
      }),
    };
  },
});

export const { useGetTasksQuery, useAddTaskMutation, useAssignTaskMutation } =
  taskAPI;
export const {
  endpoints: { getTasks, addTask, assignTask },
} = taskAPI;
