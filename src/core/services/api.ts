import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { auth } from '@/auth';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { getSession } from 'next-auth/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: async (headers) => {
    if (typeof window === 'undefined') {
      const session = await auth();
      if (session?.user?.accessToken) {
        headers.set('Authorization', `Bearer ${session.user.accessToken}`);
      }
    } else {
      const session = await getSession();
      if (session?.user?.accessToken) {
        headers.set('Authorization', `Bearer ${session.user.accessToken}`);
      }
    }

    return headers;
  },
});

type RootState = never;

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

const extractRehydrationInfo = (
  action: Action,
  { reducerPath }: { reducerPath: never }
) => {
  if (isHydrateAction(action)) {
    return action.payload[reducerPath];
  }
};

// const baseQueryWithRetry = retry(baseQuery);

export const api = createApi({
  // reducerPath: 'api',
  baseQuery: baseQuery,
  extractRehydrationInfo,
  tagTypes: ['Tasks', 'Users'],
  endpoints: () => ({}),
});
