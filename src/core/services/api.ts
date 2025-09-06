import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query';
import { RootState } from '@/store/store';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Tasks', 'Users', 'Auth'],
  endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({});
