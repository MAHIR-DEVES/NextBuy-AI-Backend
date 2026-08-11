import { Router } from 'express';
import { SteadfastWithdrawalController } from './steadfast-withdrawal.controller';
import { auth } from '../../../middleware/auth';
import { Role } from '../../../../generated/prisma/enums';

const router = Router();

router.post(
  '/',
  auth(Role.ADMIN, Role.SELLER),
  SteadfastWithdrawalController.createWithdrawal,
);

router.get('/', SteadfastWithdrawalController.getAllWithdrawals);

router.get('/:id', SteadfastWithdrawalController.getSingleWithdrawal);

router.patch(
  '/:id',
  auth(Role.ADMIN, Role.SELLER),
  SteadfastWithdrawalController.updateWithdrawal,
);

router.delete(
  '/:id',
  auth(Role.ADMIN, Role.SELLER),
  SteadfastWithdrawalController.deleteWithdrawal,
);

export const SteadfastWithdrawalRoutes = router;
