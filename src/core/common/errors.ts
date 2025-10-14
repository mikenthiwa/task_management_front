import { ErrorResponse } from '@/core/common/interfaces/ApiResponse';

export function extractApiErrorMessage(error: ErrorResponse): string {
  if (!error) return 'Request failed';

  if (error.errors && typeof error.errors === 'object') {
    const firstKey = Object.keys(error.errors)[0];
    const list = (error.errors as Record<string, string[]>)[firstKey];
    if (Array.isArray(list) && list.length > 0) {
      return list[0];
    }
  }

  if (error.title) return error.title;

  return 'Something went wrong';
}
