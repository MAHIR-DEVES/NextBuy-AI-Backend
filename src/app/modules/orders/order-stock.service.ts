import { Prisma } from '../../../generated/prisma/client';

export interface StockOrderItem {
  productId: string;
  quantity: number;
  size?: string | null;
  color?: string | null;
}

export const updateProductStock = async (
  tx: Prisma.TransactionClient,
  items: StockOrderItem[],
  action: 'DECREASE' | 'INCREASE',
) => {
  for (const item of items) {
    if (item.quantity <= 0) {
      throw new Error('Invalid product quantity');
    }

    const product = await tx.product.findUnique({
      where: {
        id: item.productId,
      },
      include: {
        colorVariants: {
          include: {
            sizes: true,
          },
        },
      },
    });

    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    // Product has color and size variants
    if (product.colorVariants.length > 0) {
      if (!item.color || !item.size) {
        throw new Error(`Color and size are required for ${product.name}`);
      }

      const colorVariant = product.colorVariants.find(
        variant => variant.color.toLowerCase() === item.color!.toLowerCase(),
      );

      if (!colorVariant) {
        throw new Error(`Color not found: ${item.color}`);
      }

      const sizeVariant = colorVariant.sizes.find(
        variant => variant.size === item.size,
      );

      if (!sizeVariant) {
        throw new Error(`Size not found: ${item.size}`);
      }

      if (action === 'DECREASE') {
        const result = await tx.productSizeVariant.updateMany({
          where: {
            id: sizeVariant.id,
            stock: {
              gte: item.quantity,
            },
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });

        if (result.count === 0) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }
      } else {
        await tx.productSizeVariant.update({
          where: {
            id: sizeVariant.id,
          },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      }
    } else {
      // Product without variants
      if (action === 'DECREASE') {
        const result = await tx.product.updateMany({
          where: {
            id: product.id,
            stock: {
              gte: item.quantity,
            },
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });

        if (result.count === 0) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }
      } else {
        await tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      }
    }
  }
};
