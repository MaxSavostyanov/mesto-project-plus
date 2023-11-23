import { Request, Response } from 'express';
import User, { IUser } from '../models/user';

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const updateUser = (data: IUser, req: Request, res: Response) => {
  const id = req.user._id;

  return User.findByIdAndUpdate(id, data, { new: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const updateProfile = (req: Request, res: Response) => {
  const { name, about } = req.body;

  updateUser({ name, about }, req, res);
};

export const updateAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;

  updateUser({ avatar }, req, res);
};
