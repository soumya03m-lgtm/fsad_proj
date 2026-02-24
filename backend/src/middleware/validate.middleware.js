export function validate(schema) {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const error = new Error('Validation failed');
      error.status = 400;
      error.code = 'VALIDATION_ERROR';
      error.details = result.error.flatten();
      return next(error);
    }

    req.body = result.data;
    next();
  };
}
