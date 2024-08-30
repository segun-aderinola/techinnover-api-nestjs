export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data?: T | null;
}

export function successResponse<T>(message: string, data: T): ApiResponse<T> {
  return {
    status: 'success',
    message,
    data,
  };
}

export function errorResponse<T = null>(message: string): ApiResponse<T> {
  return {
    status: 'error',
    message,
    data: null as T,
  };
}
