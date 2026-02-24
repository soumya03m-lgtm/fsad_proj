export function success(res, data, status = 200, meta = null) {
  const body = { success: true, data };
  if (meta) body.meta = meta;
  return res.status(status).json(body);
}

export function failure(res, error, status = 500) {
  return res.status(status).json({
    success: false,
    error: {
      code: error.code || 'INTERNAL_SERVER_ERROR',
      message: error.message || 'Unexpected error',
      details: error.details || null
    }
  });
}
