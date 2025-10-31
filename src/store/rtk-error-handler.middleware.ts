import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { extractApiErrorMessage } from '@/core/common/errors';
import { ErrorResponse } from '@/core/common/interfaces/ApiResponse';
import { toast } from 'react-toastify';

interface Payload {
  data: ErrorResponse;
}

export const rtkErrorHandlerMiddleware: Middleware =
  () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const payload = action.payload as Payload;
      const message = extractApiErrorMessage(payload.data);
      if (typeof window !== 'undefined') {
        toast.error(message);
      } else {
        throw new Error('message');
      }
    }
    return next(action);
  };
