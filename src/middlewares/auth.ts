import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorized-error';

const auth: RequestHandler = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация!'));
    return;
  }

  req.user = payload as { _id: string };

  next();
};

export default auth;
