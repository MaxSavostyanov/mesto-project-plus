import STATUS_CODES from '../constants/status-code';

class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string = 'Нет доступа!') {
    super(message);
    this.statusCode = STATUS_CODES.FORBIDDEN;
  }
}

export default ForbiddenError;
