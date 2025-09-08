import { api } from '@/core/services/api';

interface RegisterUser {
  email: string;
  password: string;
}

export const usersPostApi = api.injectEndpoints({
  endpoints: (build) => ({
    addUser: build.mutation({
      query: (user: RegisterUser) => ({
        url: '/users/register',
        method: 'POST',
        body: user,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Error adding user:', error);
        }
      },
    }),
  }),
});

export const { useAddUserMutation } = usersPostApi;
export const {
  endpoints: { addUser },
} = usersPostApi;
