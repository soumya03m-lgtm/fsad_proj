export function notFoundMiddleware(req, _res, next) {
  const error = new Error(`Route ${req.path} not found`);
  error.status = 404;
  error.code = 'NOT_FOUND';
  next(error);
}
