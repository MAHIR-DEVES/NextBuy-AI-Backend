import { Prisma } from '../../../generated/prisma/client';
import { prisma } from '../../lib/prisma';

type GetAllOrdersParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
};

/**
 * BUY NOW (single product order)
 */
const createBuyNowOrder = async (
  userId: string | undefined,
  productId: string,
  quantity: number,
  name: string,
  phone: string,
  district: string,
  thana: string,
  address: string,
  note: string | undefined,
  isInsideDhaka: boolean,
  size?: string | null,
) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const total = product.price * quantity;

    const shippingFee = isInsideDhaka ? 90 : 130;

    const order = await prisma.order.create({
      data: {
        ...(userId ? { userId } : {}),

        total: total + shippingFee,

        name,
        phone,
        district,
        thana,
        address,
        note: note || null,
        isInsideDhaka,
        shippingFee,

        items: {
          create: [
            {
              productId: product.id,
              name: product.name,
              price: product.price,
              quantity,
              size: size || null,
            },
          ],
        },
      },

      include: {
        items: true,
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
  district: string,
  thana: string,
  address: string,
  note: string | undefined,
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

    const shippingFee = isInsideDhaka ? 90 : 130;

    const subtotal = cartItems.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    const total = subtotal + shippingFee;

    const order = await prisma.order.create({
      data: {
        userId,

        name,
        phone,
        district,
        thana,
        address,
        note: note || null,

        isInsideDhaka,
        shippingFee,
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
    throw new Error('Failed to get user orders');
  }
};

/**
 * GET ALL ORDERS
 */
const getAllOrders = async ({
  page = 1,
  limit = 10,
  search = '',
  status,
}: GetAllOrdersParams = {}) => {
  try {
    const currentPage = Math.max(Number(page) || 1, 1);

    const perPage = Math.min(Math.max(Number(limit) || 10, 1), 100);

    const skip = (currentPage - 1) * perPage;

    const where: Prisma.OrderWhereInput = {};

    const searchValue = search.trim();

    if (searchValue) {
      where.OR = [
        {
          name: {
            contains: searchValue,
            mode: 'insensitive',
          },
        },
        {
          phone: {
            contains: searchValue,
            mode: 'insensitive',
          },
        },
        {
          district: {
            contains: searchValue,
            mode: 'insensitive',
          },
        },
        {
          thana: {
            contains: searchValue,
            mode: 'insensitive',
          },
        },
        {
          address: {
            contains: searchValue,
            mode: 'insensitive',
          },
        },
        {
          user: {
            name: {
              contains: searchValue,
              mode: 'insensitive',
            },
          },
        },
        {
          user: {
            email: {
              contains: searchValue,
              mode: 'insensitive',
            },
          },
        },
        {
          user: {
            phone: {
              contains: searchValue,
            },
          },
        },
      ];
    }

    if (status) {
      const validStatuses = [
        'PENDING',
        'SHIPPED',
        'DELIVERED',
        'CANCELLED',
        'PARTIAL',
      ];

      if (!validStatuses.includes(status)) {
        throw new Error('Invalid order status');
      }

      where.status = status as Prisma.OrderWhereInput['status'];
    }

    // DATABASE QUERIES

    const [orders, total, statusCounts] = await Promise.all([
      prisma.order.findMany({
        where,

        skip,
        take: perPage,

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
      }),

      prisma.order.count({
        where,
      }),

      prisma.order.groupBy({
        by: ['status'],

        _count: {
          _all: true,
        },
      }),
    ]);

    // STATUS COUNTS

    const totalPending =
      statusCounts.find(item => item.status === 'PENDING')?._count._all ?? 0;

    const totalShipped =
      statusCounts.find(item => item.status === 'SHIPPED')?._count._all ?? 0;

    const totalDelivered =
      statusCounts.find(item => item.status === 'DELIVERED')?._count._all ?? 0;

    const totalCancelled =
      statusCounts.find(item => item.status === 'CANCELLED')?._count._all ?? 0;

    const totalPartial =
      statusCounts.find(item => item.status === 'PARTIAL')?._count._all ?? 0;

    // PAGINATION

    const totalPages = Math.ceil(total / perPage);

    return {
      orders,

      meta: {
        page: currentPage,
        limit: perPage,
        total,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },

      summary: {
        totalOrders: total,
        totalPending,
        totalShipped,
        totalDelivered,
        totalCancelled,
        totalPartial,
      },
    };
  } catch (error) {
    console.error('Get all orders error:', error);

    throw new Error('Failed to get all orders');
  }
};

/**
 * GET SINGLE ORDER
 */
const getSingleOrder = async (orderId: string) => {
  try {
    if (!orderId) {
      throw new Error('Order ID is required');
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },

      include: {
        items: {
          include: {
            product: {
              select: {
                thumbnail: true,
              },
            },
          },
        },

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

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  } catch (error) {
    console.error('Get single order error:', error);

    if (
      error instanceof Error &&
      ['Order ID is required', 'Order not found'].includes(error.message)
    ) {
      throw error;
    }

    throw new Error('Failed to get single order');
  }
};

const VALID_ORDER_STATUSES = [
  'PENDING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'PARTIAL',
] as const;

type OrderStatus = (typeof VALID_ORDER_STATUSES)[number];

// UPDATE ORDER STATUS

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
) => {
  try {
    if (!orderId) {
      throw new Error('Order ID is required');
    }

    if (!VALID_ORDER_STATUSES.includes(status)) {
      throw new Error('Invalid order status');
    }

    const existingOrder = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!existingOrder) {
      throw new Error('Order not found');
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },

      data: {
        status,
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

    return updatedOrder;
  } catch (error) {
    console.error('Update order status error:', error);

    if (
      error instanceof Error &&
      [
        'Order ID is required',
        'Invalid order status',
        'Order not found',
      ].includes(error.message)
    ) {
      throw error;
    }

    throw new Error('Failed to update order status');
  }
};

// DELETE ORDER

export const deleteOrder = async (orderId: string) => {
  try {
    if (!orderId) {
      throw new Error('Order ID is required');
    }

    const existingOrder = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!existingOrder) {
      throw new Error('Order not found');
    }

    await prisma.order.delete({
      where: {
        id: orderId,
      },
    });

    return {
      id: orderId,
    };
  } catch (error) {
    console.error('Delete order error:', error);

    if (
      error instanceof Error &&
      ['Order ID is required', 'Order not found'].includes(error.message)
    ) {
      throw error;
    }

    throw new Error('Failed to delete order');
  }
};

export const OrderService = {
  createBuyNowOrder,
  checkoutCart,
  getUserOrders,
  getAllOrders,

  getSingleOrder,
};
