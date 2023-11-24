import type { RequestHandler } from 'express';
import User from '../models/user';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-error';
import STATUS_CODES from '../constants/status-code';

export const getUsers: RequestHandler = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(STATUS_CODES.OK).send({ users });
    })
    .catch(next);
};

export const getUser: RequestHandler = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Пользователь с id(${userId}) не найден!`);
      }

      res.status(STATUS_CODES.OK).send({ message: `Пользователь с id(${userId})найден!`, user });
    })
    .catch(next);
};

export const createUser: RequestHandler = (req, res, next) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => {
      if (!user) throw new BadRequestError();

      res.status(STATUS_CODES.CREATED).send({ message: 'Новый пользователь создан!', user });
    })
    .catch(next);
};

const updateUser: RequestHandler = (req, res, next) => {
  const userId = req.user._id;

  return User.findByIdAndUpdate(
    userId,
    res.locals.data,
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) throw new NotFoundError(`Пользователь с id(${userId}) не найден!`);

      res.status(STATUS_CODES.OK).send({ message: 'Данные пользователя обновлены!', user });
    })
    .catch((err) => {
      let error = err;

      if (err.name === 'ValidationError') error = new BadRequestError();

      next(error);
    });
};

export const updateProfile: RequestHandler = (req, res, next) => {
  const { name, about } = req.body;
  res.locals.data = { name, about };

  updateUser(req, res, next);
};

export const updateAvatar: RequestHandler = (req, res, next) => {
  const { avatar } = req.body;
  res.locals.data = { avatar };

  updateUser(req, res, next);
};
