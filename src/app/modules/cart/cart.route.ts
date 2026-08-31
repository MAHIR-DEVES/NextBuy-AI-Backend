import { Router } from 'express';
import { CartController } from './cart.controller';
import { auth } from '../../middleware/auth';
import { Role } from '../../../generated/prisma/enums';

const router = Router();
const accessRole = auth(
  Role.ADMIN,
  Role.SELLER,
  Role.CUSTOMER,
  Role.SUPER_ADMIN,
);

router.post('/', CartController.addToCart);

router.get('/', CartController.getMyCart);

router.patch('/:id', CartController.updateCartItem);

router.delete('/:id', CartController.deleteCartItem);

router.delete('/clear/all', accessRole, CartController.clearCart);

export const CartRoute = router;
