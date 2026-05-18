import { Response } from 'express';

// Define the standard API response structure
export interface ApiResponse<T = null> {
  success: boolean;
  message?: string;
  data: T | null;
  error?: {
    code: string;
    details?: unknown;
  };
}

// Global API response function
export const sendApiResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  data: T | null = null,
  message?: string,
  errorDetails?: unknown,
  errorCode: string = 'SERVER_ERROR'
): Response => {
  const responsePayload: ApiResponse<T> = {
    success,
    message,
    data,
    ...(success === false && {
      error: {
        code: errorCode,
        details: errorDetails,
      },
    }),
  };

  return res.status(statusCode).json(responsePayload);
};
