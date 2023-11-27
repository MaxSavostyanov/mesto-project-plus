import { Router } from 'express';
import {
  getUsers,
  getUserById,
  getUserMe,
  updateProfile,
  updateAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);

router.get('/me', getUserMe);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

export default router;
