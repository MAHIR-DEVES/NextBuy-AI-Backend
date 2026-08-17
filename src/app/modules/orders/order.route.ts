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

// get all orders( admin only)
router.get('/all', auth(Role.ADMIN), OrderController.getAllOrders);

// get single order
router.get('/:orderId', OrderController.getSingleOrder);

/**
 * GET USER ORDERS
 */
router.get('/', auth(Role.CUSTOMER, Role.ADMIN), OrderController.getOrders);

// Update order status
router.patch('/:id/status', auth(Role.ADMIN), updateOrderStatusController);
router.patch('/:id', OrderController.updateOrderController);

// Delete order
router.delete('/:id', auth(Role.ADMIN), deleteOrderController);
export const OrderRoutes = router;
