export interface ApiResponse {
  success: boolean;
  status: number;
  message: string;
}

export interface ApiResponseWithData<T> extends ApiResponse {
  data: T;
}

export interface ErrorResponse {
  type: string;
  title: string;
  status: number;
  traceId: string;
  errors: Record<string, string[]>;
}
