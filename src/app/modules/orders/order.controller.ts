import { Request, Response } from 'express';

import { deleteOrder, OrderService, updateOrderStatus } from './order.service';

import { catchAsync } from '../../shared/catchAsync';
import { sendResponse } from '../../shared/sendResponse';

/**
 * BUY NOW CONTROLLER
 */
const buyNow = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const {
    productId,
    quantity,
    name,
    phone,
    district,
    thana,
    address,
    note,
    isInsideDhaka,
  } = req.body;

  const result = await OrderService.createBuyNowOrder(
    userId,
    productId,
    quantity || 1,
    name,
    phone,
    district,
    thana,
    address,
    note,
    isInsideDhaka,
  );

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: 'Order placed successfully',
    data: result,
  });
});

/**
 * CART CHECKOUT CONTROLLER
 */
const checkout = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;

  const { name, phone, district, thana, address, note, isInsideDhaka } =
    req.body;

  const result = await OrderService.checkoutCart(
    user.id,
    name,
    phone,
    district,
    thana,
    address,
    note,
    isInsideDhaka,
  );

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: 'Order placed successfully from cart',
    data: result,
  });
});

/**
 * GET USER ORDERS
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

/**
 * GET ALL ORDERS
 */
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;

  const limit = Number(req.query.limit) || 10;

  const search = String(req.query.search || '');

  const status = req.query.status ? String(req.query.status) : undefined;

  const result = await OrderService.getAllOrders({
    page,
    limit,
    search,
    status,
  });

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: 'Orders fetched successfully',
    data: result,
  });
});

/**
 * GET SINGLE ORDER
 */
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const result = await OrderService.getSingleOrder(orderId as string);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: 'Order fetched successfully',
    data: result,
  });
});

// ============================================
// UPDATE ORDER STATUS
// ============================================

export const updateOrderStatusController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
      return sendResponse(res, {
        httpStatusCode: 400,
        success: false,
        message: 'Order ID is required',
      });
    }

    if (!status) {
      return sendResponse(res, {
        httpStatusCode: 400,
        success: false,
        message: 'Order status is required',
      });
    }

    const order = await updateOrderStatus(id as string, status);

    return sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: 'Order status updated successfully',
      data: order,
    });
  } catch (error) {
    console.error('Update order status controller error:', error);

    const message =
      error instanceof Error ? error.message : 'Failed to update order status';

    if (message === 'Order not found') {
      return sendResponse(res, {
        httpStatusCode: 404,
        success: false,
        message,
      });
    }

    if (message === 'Invalid order status') {
      return sendResponse(res, {
        httpStatusCode: 400,
        success: false,
        message,
      });
    }

    return sendResponse(res, {
      httpStatusCode: 500,
      success: false,
      message: 'Failed to update order status',
    });
  }
};

// ============================================
// DELETE ORDER
// ============================================

export const deleteOrderController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, {
        httpStatusCode: 400,
        success: false,
        message: 'Order ID is required',
      });
    }

    const result = await deleteOrder(id as string);

    return sendResponse(res, {
      httpStatusCode: 200,
      success: true,
      message: 'Order deleted successfully',
      data: result,
    });
  } catch (error) {
    console.error('Delete order controller error:', error);

    const message =
      error instanceof Error ? error.message : 'Failed to delete order';

    if (message === 'Order not found') {
      return sendResponse(res, {
        httpStatusCode: 404,
        success: false,
        message,
      });
    }

    return sendResponse(res, {
      httpStatusCode: 500,
      success: false,
      message: 'Failed to delete order',
    });
  }
};

export const OrderController = {
  buyNow,
  checkout,
  getOrders,
  getAllOrders,
  getSingleOrder,
};
