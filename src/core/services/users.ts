import { api } from '@/core/services/api';
import { toast } from 'react-toastify';
import { ApiResponseWithData } from '@/core/common/interfaces/ApiResponse';
import { IUser } from '@/core/common/interfaces/user';

interface RegisterUser {
  email: string;
  password: string;
}

interface RegisterResponse {
  data: null;
}

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    addUser: build.mutation<RegisterResponse, RegisterUser>({
      query: (user: RegisterUser) => ({
        url: '/users/register',
        method: 'POST',
        body: user,
      }),
      async onQueryStarted(arg, { queryFulfilled }): Promise<void> {
        await queryFulfilled;
        toast.success('User registered successfully! You can now log in.');
      },
    }),
    getUsers: build.query<IUser[], void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      transformResponse: (response: ApiResponseWithData<IUser[]>) =>
        response.data,
      providesTags: (result) =>
        result
          ? [
              // Provide a tag for each user by id
              ...result.map((user) => ({
                type: 'Users' as const,
                id: user.id,
              })),
              // Provide a tag for the users list
              { type: 'Users' as const, id: 'LIST' },
            ]
          : [{ type: 'Users' as const, id: 'LIST' }],
    }),
  }),
});

export const { useAddUserMutation, useGetUsersQuery } = userApi;
export const {
  endpoints: { addUser },
} = userApi;
