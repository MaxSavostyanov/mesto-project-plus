import { Router } from 'express';
import usersRouter from './users';
import cardsRouter from './cards';
import login from '../controllers/login';
import { createUser } from '../controllers/users';
import auth from '../middlewares/auth';

const router = Router();

router.post('/signin', login);
router.post('/signup', createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

export default router;
