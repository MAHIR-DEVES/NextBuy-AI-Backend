export interface IProduct {
  name: string;
  slug: string;
  description?: string;

  price: number;
  discount?: number;
  stock?: number;

  thumbnail: string;
  images: string[];

  brand?: string;
  category?: string;

  rating?: number;
  reviewCount?: number;

  isFeatured?: boolean;
  isPublished?: boolean;
}

export interface ProductQuery {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: string;
  limit?: string;
  isFeatured?: string;
}
