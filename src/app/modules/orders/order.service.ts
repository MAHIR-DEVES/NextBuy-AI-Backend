import { prisma } from '../../lib/prisma';

/**
 * BUY NOW (single product order)
 */
const createBuyNowOrder = async (
  userId: string,
  productId: string,
  quantity: number,
  name: string,
  phone: string,
  address: string,
  isInsideDhaka: boolean,
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

        name,
        phone,
        address,
        isInsideDhaka,

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
    });
    return order;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create buy now order');
  }
};

/**
 * CART CHECKOUT (multiple product order)
 */
const checkoutCart = async (
  userId: string,
  name: string,
  phone: string,
  address: string,
  isInsideDhaka: boolean,
) => {
  try {
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    const shippingFee = isInsideDhaka ? 60 : 120;

    const subtotal = cartItems.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    const total = subtotal + shippingFee;

    const order = await prisma.order.create({
      data: {
        userId,
        name,
        phone,
        address,
        isInsideDhaka,
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

    // clear cart
    await prisma.cart.deleteMany({
      where: { userId },
    });

    return order;
  } catch (error: any) {
    console.log(error);

    throw new Error(error.message);
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
