import STATUS_CODES from '../constants/status-code';

class ConflictError extends Error {
  statusCode: number;

  constructor(message: string = 'Conflict Error!') {
    super(message);
    this.statusCode = STATUS_CODES.CONFLICT;
  }
}

export default ConflictError;
