import { Router } from 'express';
import {
  deleteOrderController,
  OrderController,
  updateOrderStatusController,
} from './order.controller';
import { Role } from '../../../generated/prisma/enums';
import { auth } from '../../middleware/auth';

const router = Router();

/**
 * BUY NOW (single product)
 */
router.post(
  '/buy-now',
  auth(Role.CUSTOMER, Role.ADMIN),
  OrderController.buyNow,
);

/**
 * CART CHECKOUT
 */
router.post(
  '/checkout',
  auth(Role.CUSTOMER, Role.ADMIN),
  OrderController.checkout,
);

/**
 * GET USER ORDERS
 */
router.get('/', auth(Role.CUSTOMER, Role.ADMIN), OrderController.getOrders);

// get all orders( admin only)
router.get('/all', auth(Role.ADMIN), OrderController.getAllOrders);
export const OrderRoutes = router;

// Update order status
router.patch('/:id/status', auth(Role.ADMIN), updateOrderStatusController);

// Delete order
router.delete('/:id', auth(Role.ADMIN), deleteOrderController);
