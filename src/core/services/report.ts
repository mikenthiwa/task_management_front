import { api } from '@/core/services/api';
import { toast } from 'react-toastify';

interface GenerateReportPayload {
  from: string;
  to: string;
}

export interface GenerateReportResponse {
  success: boolean;
  statusCode: number;
  message: string;
  errors: unknown;
  data: string;
}

export const reportApi = api.injectEndpoints({
  endpoints: (build) => ({
    generateReport: build.mutation<
      GenerateReportResponse,
      GenerateReportPayload
    >({
      query: (payload) => ({
        url: '/report',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: GenerateReportResponse) => response,
      async onQueryStarted(_, { queryFulfilled }): Promise<void> {
        try {
          const { data } = await queryFulfilled;
          toast.success(data.message);
        } catch (_error) {
          // Error handling is centralized in the RTK middleware
        }
      },
    }),
  }),
});

export const { useGenerateReportMutation } = reportApi;
export const {
  endpoints: { generateReport },
} = reportApi;
