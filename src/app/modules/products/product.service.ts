// product.service.ts

import { prisma } from '../../lib/prisma';
import { IProduct, ProductQuery } from './product.interface';

const createProduct = async (payload: IProduct) => {
  try {
    const result = await prisma.product.create({
      data: payload,
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create product');
  }
};

const getAllProducts = async (query: ProductQuery) => {
  try {
    const {
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
      isFeatured,
    } = query;

    // Pagination setup
    const skip = (Number(page) - 1) * Number(limit);

    // Filters
    const filters: any = {};

    //  Search (name / description)
    if (search) {
      filters.OR = [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    //  Category filter
    if (category) {
      filters.category = category;
    }

    // Brand filter
    if (brand) {
      filters.brand = brand;
    }

    // Featured filter
    if (isFeatured !== undefined) {
      filters.isFeatured = isFeatured === 'true';
    }

    //  Price range filter
    if (minPrice || maxPrice) {
      filters.price = {
        gte: minPrice ? Number(minPrice) : undefined,
        lte: maxPrice ? Number(maxPrice) : undefined,
      };
    }

    // Sorting
    const orderBy: any = {
      [sortBy]: sortOrder,
    };

    // Query
    const result = await prisma.product.findMany({
      where: filters,
      orderBy,
      skip,
      take: Number(limit),
    });

    //  total count (for pagination UI)
    const total = await prisma.product.count({
      where: filters,
    });

    return {
      data: result,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

const getSingleProduct = async (id: string) => {
  try {
    const result = await prisma.product.findUnique({
      where: { id },
    });

    return result;
  } catch (error) {
    throw new Error('Failed to fetch product');
  }
};

const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  try {
    const result = await prisma.product.update({
      where: { id },
      data: payload,
    });

    return result;
  } catch (error) {
    throw new Error('Failed to update product');
  }
};

const deleteProduct = async (id: string) => {
  try {
    const result = await prisma.product.delete({
      where: { id },
    });

    return result;
  } catch (error) {
    throw new Error('Failed to delete product');
  }
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
