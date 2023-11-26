import type { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import NotFoundError from '../errors/not-found-error';
import STATUS_CODES from '../constants/status-code';

export const getUsers: RequestHandler = (req, res, next) => {
  User.find({})
    .orFail(new NotFoundError('Пользователей нет!'))
    .then((users) => {
      res.status(STATUS_CODES.OK).send({ users });
    })
    .catch(next);
};

export const getUser: RequestHandler = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new NotFoundError(`Пользователь с id(${userId}) не найден!`))
    .then((user) => {
      res.status(STATUS_CODES.OK).send({ message: `Пользователь с id(${userId})найден!`, user });
    })
    .catch(next);
};

export const createUser: RequestHandler = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
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
    .orFail(new NotFoundError(`Пользователь с id(${userId}) не найден!`))
    .then((user) => {
      res.status(STATUS_CODES.OK).send({ message: 'Данные пользователя обновлены!', user });
    })
    .catch(next);
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
