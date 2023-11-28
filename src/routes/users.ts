import { Router } from 'express';
import {
  getUsers,
  getUserById,
  getUserMe,
  updateProfile,
  updateAvatar,
} from '../controllers/users';
import { validateID, validateUpdateAvatar, validateUpdateProfile } from '../middlewares/validators';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', validateID, getUserById);

router.get('/me', getUserMe);
router.patch('/me', validateUpdateProfile, updateProfile);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

export default router;
