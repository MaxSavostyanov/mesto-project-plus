import { Request, Response } from 'express';

import Card from '../models/card';

export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const id = req.user._id;

  return Card.create({ name, link, owner: id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then(() => {
      res.status(200).send({ message: 'Карточка удалена!' });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
