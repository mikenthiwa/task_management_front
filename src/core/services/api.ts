import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: async (headers) => {
    const session = await getSession();
    if (session?.user?.accessToken) {
      headers.set('Authorization', `Bearer ${session.user.accessToken}`);
    }
    return headers;
  },
});

// const baseQueryWithRetry = retry(baseQuery);

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: ['Tasks'],
  endpoints: () => ({}),
});
