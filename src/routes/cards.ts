import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';
import { validateCreateCard, validateID } from '../middlewares/validators';

const router = Router();

router.get('/', getCards);

router.post('/', validateCreateCard, createCard);

router.delete('/:cardId', validateID, deleteCard);

router.put('/:cardId/likes', validateID, likeCard);
router.delete('/:cardId/likes', validateID, dislikeCard);

export default router;
