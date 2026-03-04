import { ErrorResponse } from '@/core/common/interfaces/ApiResponse';

export function extractApiErrorMessage(error: ErrorResponse): string {
  if (!error) return 'An error occurred!';

  if (error.errors && typeof error.errors === 'object') {
    const firstKey = Object.keys(error.errors)[0];
    const list = (error.errors as Record<string, string[]>)[firstKey];
    if (Array.isArray(list) && list.length > 0) {
      return list[0];
    }
  }

  if (error.detail) return error.detail;

  return 'Something went wrong';
}
