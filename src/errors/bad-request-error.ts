import STATUS_CODES from '../constants/status-code';

class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string = 'Переданы некорректные данные!') {
    super(message);
    this.statusCode = STATUS_CODES.BAD_REQUEST;
  }
}

export default BadRequestError;
