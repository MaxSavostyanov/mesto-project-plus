import { Router } from 'express';
import usersRouter from './users';
import cardsRouter from './cards';
import login from '../controllers/login';
import { createUser } from '../controllers/users';
import auth from '../middlewares/auth';
import { validateCreateUser, validateLogin } from '../middlewares/validators';

const router = Router();

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

export default router;
