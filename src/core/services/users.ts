import { api } from '@/core/services/api';
import { toast } from 'react-toastify';

interface RegisterUser {
  email: string;
  password: string;
}

interface RegisterResponse {
  data: null;
}

export const usersPostApi = api.injectEndpoints({
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
  }),
});

export const { useAddUserMutation } = usersPostApi;
export const {
  endpoints: { addUser },
} = usersPostApi;
