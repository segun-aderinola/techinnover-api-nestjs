import { Response } from 'express';

export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data?: T | null;
}

export function successResponse<T>(
  res: Response,
  message: string,
  data: T,
): void {
  res.status(200).json({
    status: 'success',
    message,
    data,
  });
}

export function errorResponse<T = null>(res: Response, message: string): void {
  res.status(400).json({
    status: 'error',
    message,
    data: null as T,
  });
}
