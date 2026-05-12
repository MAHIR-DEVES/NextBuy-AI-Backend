import { Router } from 'express';
import { CartController } from './cart.controller';
import { auth } from '../../middleware/auth';
import { Role } from '../../../generated/prisma/enums';

const router = Router();

router.post(
  '/',
  auth(Role.CUSTOMER, Role.SELLER, Role.ADMIN),
  CartController.addToCart,
);

router.get('/', auth(Role.CUSTOMER, Role.ADMIN), CartController.getMyCart);

router.patch(
  '/:id',
  auth(Role.CUSTOMER, Role.ADMIN, Role.SELLER),
  CartController.updateCartItem,
);

router.delete(
  '/:id',
  auth(Role.CUSTOMER, Role.ADMIN, Role.SELLER),
  CartController.deleteCartItem,
);

router.delete('/clear/all', auth(Role.CUSTOMER), CartController.clearCart);

export const CartRoute = router;
