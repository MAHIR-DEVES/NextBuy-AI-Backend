import { Router } from 'express';
import { UserController } from './user.controller';
import { auth } from '../../middleware/auth';
import { Role } from '../../../generated/prisma/enums';

const router = Router();

router.post('/', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/', UserController.getAllUsers);
router.get(
  '/me',
  auth(Role.ADMIN, Role.SELLER, Role.CUSTOMER),
  UserController.getCurrentUser,
); // Current user

router.get(
  '/:id',
  auth(Role.ADMIN, Role.SELLER, Role.CUSTOMER),
  UserController.getSingleUser,
); // Single user
router.put(
  '/:id',
  auth(Role.SELLER, Role.CUSTOMER, Role.ADMIN),
  UserController.updateUser,
); // Update user
router.put(
  '/:id/password',
  auth(Role.SELLER, Role.CUSTOMER, Role.ADMIN),
  UserController.changePassword,
);
router.delete('/:id', auth(Role.ADMIN), UserController.deleteUser);

export const UserRoute = router;
