import { env } from '../config/env.js';
import { AppError } from '../core/errors/appError.js';
import { failure } from '../core/http/apiResponse.js';

export function errorMiddleware(err, _req, res, _next) {
  const isAppError = err instanceof AppError;
  const status = err.status || 500;
  const normalizedError = {
    code: err.code || 'INTERNAL_SERVER_ERROR',
    message: err.message || 'Unexpected error',
    details: err.details || null
  };

  if (!isAppError && env.nodeEnv !== 'production') {
    normalizedError.details = {
      ...(normalizedError.details || {}),
      stack: err.stack
    };
  }

  return failure(res, normalizedError, status);
}
