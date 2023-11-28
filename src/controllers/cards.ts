import type { RequestHandler } from 'express';
import Card from '../models/card';
import NotFoundError from '../errors/not-found-error';
import ForbiddenError from '../errors/forbidden-error';
import STATUS_CODES from '../constants/status-code';

export const getCards: RequestHandler = (req, res, next) => {
  Card.find({})
    .orFail(new NotFoundError('Карточек нет!'))
    .then((cards) => {
      res.status(STATUS_CODES.OK).send({ cards });
    })
    .catch(next);
};

export const createCard: RequestHandler = (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  return Card.create({ name, link, owner: userId })
    .then((card) => {
      res.status(STATUS_CODES.CREATED).send({ message: 'Новая карточка создана!', card });
    })
    .catch(next);
};

export const deleteCard: RequestHandler = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .orFail(new NotFoundError(`Карточка с id(${cardId}) не найдена!`))
    .then((card) => {
      const ownerId = String(card.owner);

      if (ownerId !== userId) {
        throw new ForbiddenError('Удаление чужой карточки невозможно!');
      }

      card.remove();
    })
    .then((card) => {
      res.status(STATUS_CODES.OK).send({ message: `Карточка с id(${cardId}) удалена!`, card });
    })
    .catch(next);
};

const updateLike: RequestHandler = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  const { method } = res.locals;

  Card.findByIdAndUpdate(
    cardId,
    { [method]: { likes: userId } },
    { new: true },
  )
    .orFail(new NotFoundError(`Карточка с id(${cardId}) не найдена!`))
    .then((card) => {
      res.status(STATUS_CODES.OK)
        .send({
          message: `Лайк ${method === '$addToSet'
            ? 'добавлен'
            : 'удалён'}!`,
          card,
        });
    })
    .catch(next);
};

export const likeCard: RequestHandler = (req, res, next) => {
  res.locals.method = '$addToSet';
  updateLike(req, res, next);
};

export const dislikeCard: RequestHandler = (req, res, next) => {
  res.locals.method = '$pull';
  updateLike(req, res, next);
};
