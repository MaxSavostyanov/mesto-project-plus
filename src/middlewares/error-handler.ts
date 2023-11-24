import type { ErrorRequestHandler } from 'express';
import STATUS_CODES from '../constants/status-code';
import BadRequestError from '../errors/bad-request-error';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let error = err;

  if (err.name === 'CastError') error = new BadRequestError('Передан невалидный ID');

  if (err.name === 'ValidationError') error = new BadRequestError();

  const { statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR, message } = error;

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
