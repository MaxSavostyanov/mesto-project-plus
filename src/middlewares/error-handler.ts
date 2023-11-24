import type { ErrorRequestHandler } from 'express';
import STATUS_CODES from '../constants/status-code';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === STATUS_CODES.INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка!'
        : message,
    });

  return next();
};

export default errorHandler;
