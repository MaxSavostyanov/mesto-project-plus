import STATUS_CODES from '../constants/status-code';

class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string = 'Неправильные почта или пароль!') {
    super(message);
    this.statusCode = STATUS_CODES.UNAUTHORIZED;
  }
}

export default UnauthorizedError;
