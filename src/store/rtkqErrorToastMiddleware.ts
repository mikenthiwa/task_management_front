import { isRejectedWithValue, ListenerMiddleware } from '@reduxjs/toolkit';
import { extractApiErrorMessage } from '@/core/common/errors';
import { toast } from 'react-toastify';
import { ErrorResponse } from '@/core/common/interfaces/ApiResponse';

interface Payload {
  data: ErrorResponse;
}

export const rtkErrorToastMiddleware: ListenerMiddleware =
  () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const payload = action.payload as Payload;
      const message = extractApiErrorMessage(payload.data);
      toast.error(message || 'An error occurred');
    }
    return next(action);
  };
