import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import STATUS_CODES from '../constants/status-code';

const { SECRET_KEY } = require('../../config');

const login: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_KEY as string,
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, { httpOnly: true, sameSite: true })
        .status(STATUS_CODES.OK)
        .send({ token });
    })
    .catch(next);
};

export default login;
