import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { extractApiErrorMessage } from '@/core/common/errors';
import { ErrorResponse } from '@/core/common/interfaces/ApiResponse';
import { setError } from '@/core/common/Error/error-slice';

interface Payload {
  data: ErrorResponse;
}

export const rtkErrorHandlerMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      const payload = action.payload as Payload;
      const message = extractApiErrorMessage(payload.data);
      if (typeof window !== 'undefined') {
        dispatch(setError(message));
      } else {
        throw new Error('message');
      }
    }
    return next(action);
  };
