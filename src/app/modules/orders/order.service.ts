import { prisma } from '../../lib/prisma';

/**
 * BUY NOW (single product order)
 */
const createBuyNowOrder = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const total = product.price * quantity;

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: [
            {
              productId: product.id,
              name: product.name,
              price: product.price,
              quantity,
            },
          ],
        },
      },
      include: {
        items: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
      },
    });

    return order;
  } catch (error) {
    throw new Error('Failed to create buy now order');
  }
};

/**
 * CART CHECKOUT (multiple product order)
 */
const checkoutCart = async (userId: string) => {
  try {
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }
    //  2. Ownership check (extra safety)
    const invalidItem = cartItems.find(item => item.userId !== userId);

    if (invalidItem) {
      throw new Error('Unauthorized: Cart user mismatch');
    }

    const total = cartItems.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: cartItems.map(item => ({
            productId: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // clear cart after order
    await prisma.cart.deleteMany({
      where: { userId },
    });

    return order;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || 'Failed to checkout cart');
  }
};

/**
 * GET USER ORDERS
 */
const getUserOrders = async (userId: string) => {
  try {
    return prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    throw new Error('Failed to get user orders');
  }
};

const getAllOrders = async () => {
  try {
    return prisma.order.findMany({
      include: {
        items: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    throw new Error('Failed to get all orders');
  }
};

export const OrderService = {
  createBuyNowOrder,
  checkoutCart,
  getUserOrders,
  getAllOrders,
};
