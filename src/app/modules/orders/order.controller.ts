import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { get } from 'node:http';
import { catchAsync } from '../../shared/catchAsync';
import { sendResponse } from '../../shared/sendResponse';

/**
 * BUY NOW CONTROLLER
 */

const buyNow = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { productId, quantity } = req.body;
  const result = await OrderService.createBuyNowOrder(
    userId,
    productId,
    quantity || 1,
  );
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: 'Order placed successfully (Buy Now)',
    data: result,
  });
});

/**
 * CART CHECKOUT CONTROLLER
 */

const checkout = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const result = await OrderService.checkoutCart(userId);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: 'Order placed successfully from cart',
    data: result,
  });
});

/**
 * GET ORDERS
 */

const getOrders = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const result = await OrderService.getUserOrders(userId);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: 'Orders fetched successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders();
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: 'Orders fetched successfully',
    data: result,
  });
});

export const OrderController = {
  buyNow,
  checkout,
  getOrders,
  getAllOrders,
};
