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

const updateLike = (method: string, req: Request, res: Response) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { [method]: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const likeCard = (req: Request, res: Response) => updateLike('$addToSet', req, res);

export const dislikeCard = (req: Request, res: Response) => updateLike('$pull', req, res);
