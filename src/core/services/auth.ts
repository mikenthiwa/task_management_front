import { api } from '@/core/services/api';

interface LoginRequest {
  email: string;
  password: string;
}
interface LoginResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export const authPostApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }): Promise<void> {},
    }),
  }),
});

export const { useLoginMutation } = authPostApi;
export const {
  endpoints: { login },
} = authPostApi;
