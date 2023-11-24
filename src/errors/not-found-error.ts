import STATUS_CODES from '../constants/status-code';

class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string = 'Запрашиваемые данные не найдены!') {
    super(message);
    this.statusCode = STATUS_CODES.NOT_FOUND;
  }
}

export default NotFoundError;
