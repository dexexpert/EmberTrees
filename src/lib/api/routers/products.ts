// =============================================================================
// PRODUCTS TRPC ROUTER
// =============================================================================

import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { createTRPCRouter, publicProcedure, protectedProcedure, ageVerifiedProcedure, adminProcedure } from '@/lib/api/trpc';
import { CANNABIS_CATEGORIES, STRAIN_TYPES, PRODUCT_WEIGHTS } from '@/lib/constants/cannabis';

const productFilterSchema = z.object({
  category: z.enum(['FLOWER', 'EDIBLES', 'CONCENTRATES', 'VAPES', 'PREROLLS', 'TOPICALS', 'ACCESSORIES', 'BEVERAGES']).optional(),
  strainType: z.enum(['SATIVA', 'INDICA', 'HYBRID']).optional(),
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().min(0).optional(),
  thcMin: z.number().min(0).max(100).optional(),
  thcMax: z.number().min(0).max(100).optional(),
  cbdMin: z.number().min(0).max(100).optional(),
  cbdMax: z.number().min(0).max(100).optional(),
  inStock: z.boolean().optional(),
  featured: z.boolean().optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(12),
});

const createProductSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum(['FLOWER', 'EDIBLES', 'CONCENTRATES', 'VAPES', 'PREROLLS', 'TOPICALS', 'ACCESSORIES', 'BEVERAGES']),
  subcategory: z.string().optional(),
  brand: z.string().min(2, 'Brand is required'),
  strain: z.string().optional(),
  strainType: z.enum(['SATIVA', 'INDICA', 'HYBRID']).optional(),
  thcContent: z.number().min(0).max(100).optional(),
  cbdContent: z.number().min(0).max(100).optional(),
  basePrice: z.number().min(0.01, 'Price must be greater than 0'),
  images: z.array(z.string().url()).min(1, 'At least one image is required'),
  tags: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
});

export const productsRouter = createTRPCRouter({
  // Get all products with filters (public)
  getAll: publicProcedure
    .input(productFilterSchema)
    .query(async ({ input, ctx }) => {
      const { page, limit, search, category, strainType, priceMin, priceMax, thcMin, thcMax, cbdMin, cbdMax, inStock, featured } = input;

      const skip = (page - 1) * limit;

      // Build where clause
      const where: any = {
        status: 'ACTIVE',
        isActive: true,
      };

      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { brand: { contains: search, mode: 'insensitive' } },
          { strain: { contains: search, mode: 'insensitive' } },
        ];
      }

      if (category) where.category = category;
      if (strainType) where.strainType = strainType;
      if (featured !== undefined) where.isFeatured = featured;
      if (thcMin !== undefined) where.thcContent = { ...where.thcContent, gte: thcMin };
      if (thcMax !== undefined) where.thcContent = { ...where.thcContent, lte: thcMax };
      if (cbdMin !== undefined) where.cbdContent = { ...where.cbdContent, gte: cbdMin };
      if (cbdMax !== undefined) where.cbdContent = { ...where.cbdContent, lte: cbdMax };

      // Price filtering on variants
      if (priceMin !== undefined || priceMax !== undefined) {
        where.variants = {
          some: {
            isActive: true,
            ...(priceMin && { price: { gte: priceMin } }),
            ...(priceMax && { price: { lte: priceMax } }),
          },
        };
      }

      // Stock filtering
      if (inStock) {
        where.variants = {
          some: {
            isActive: true,
            stockQuantity: { gt: 0 },
          },
        };
      }

      const [products, total] = await Promise.all([
        ctx.prisma.product.findMany({
          where,
          include: {
            variants: {
              where: { isActive: true },
              orderBy: { price: 'asc' },
            },
            reviews: {
              take: 5,
              orderBy: { createdAt: 'desc' },
              select: {
                rating: true,
                user: { select: { firstName: true } },
              },
            },
            _count: { select: { reviews: true } },
          },
          orderBy: [
            { isFeatured: 'desc' },
            { createdAt: 'desc' },
          ],
          skip,
          take: limit,
        }),
        ctx.prisma.product.count({ where }),
      ]);

      // Calculate additional fields
      const productsWithExtras = products.map(product => {
        const inStockVariants = product.variants.filter(v => v.stockQuantity > 0);
        const prices = product.variants.map(v => Number(v.price));
        const ratings = product.reviews.map(r => r.rating);
        const averageRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;

        return {
          ...product,
          inStock: inStockVariants.length > 0,
          lowestPrice: Math.min(...prices),
          highestPrice: Math.max(...prices),
          averageRating: Math.round(averageRating * 10) / 10,
          totalReviews: product._count.reviews,
        };
      });

      return {
        data: productsWithExtras,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: skip + limit < total,
          hasPrev: page > 1,
        },
      };
    }),

  // Get single product by ID or slug
  getById: publicProcedure
    .input(z.object({
      id: z.string().optional(),
      slug: z.string().optional(),
    }))
    .query(async ({ input, ctx }) => {
      if (!input.id && !input.slug) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Either id or slug is required',
        });
      }

      const product = await ctx.prisma.product.findFirst({
        where: {
          ...(input.id && { id: input.id }),
          ...(input.slug && { slug: input.slug }),
          status: 'ACTIVE',
          isActive: true,
        },
        include: {
          variants: {
            where: { isActive: true },
            orderBy: { price: 'asc' },
          },
          reviews: {
            orderBy: { createdAt: 'desc' },
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  avatar: true,
                },
              },
            },
          },
          _count: { select: { reviews: true } },
        },
      });

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        });
      }

      // Calculate additional fields
      const inStockVariants = product.variants.filter(v => v.stockQuantity > 0);
      const prices = product.variants.map(v => Number(v.price));
      const ratings = product.reviews.map(r => r.rating);
      const averageRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;

      return {
        ...product,
        inStock: inStockVariants.length > 0,
        lowestPrice: Math.min(...prices),
        highestPrice: Math.max(...prices),
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews: product._count.reviews,
      };
    }),

  // Get featured products
  getFeatured: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(20).default(8) }))
    .query(async ({ input, ctx }) => {
      const products = await ctx.prisma.product.findMany({
        where: {
          status: 'ACTIVE',
          isActive: true,
          isFeatured: true,
        },
        include: {
          variants: {
            where: { isActive: true },
            orderBy: { price: 'asc' },
          },
          _count: { select: { reviews: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: input.limit,
      });

      return products.map(product => {
        const inStockVariants = product.variants.filter(v => v.stockQuantity > 0);
        const prices = product.variants.map(v => Number(v.price));

        return {
          ...product,
          inStock: inStockVariants.length > 0,
          lowestPrice: Math.min(...prices),
          highestPrice: Math.max(...prices),
        };
      });
    }),

  // Create product (Admin only)
  create: adminProcedure
    .input(createProductSchema)
    .mutation(async ({ input, ctx }) => {
      const { variants, ...productData } = input;

      // Generate slug from name
      const slug = input.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const product = await ctx.prisma.product.create({
        data: {
          ...productData,
          slug,
          sku: `PRD-${Date.now()}`,
        },
      });

      return {
        success: true,
        product,
      };
    }),

  // Leave product review (Age verified users only)
  createReview: ageVerifiedProcedure
    .input(z.object({
      productId: z.string().cuid(),
      rating: z.number().min(1).max(5),
      title: z.string().max(100).optional(),
      comment: z.string().max(1000).optional(),
      images: z.array(z.string().url()).max(5).default([]),
    }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      // Check if user already reviewed this product
      const existingReview = await ctx.prisma.review.findUnique({
        where: {
          userId_productId: {
            userId,
            productId: input.productId,
          },
        },
      });

      if (existingReview) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'You have already reviewed this product',
        });
      }

      // Check if user has purchased this product
      const hasPurchased = await ctx.prisma.orderItem.findFirst({
        where: {
          productId: input.productId,
          order: {
            userId,
            status: 'DELIVERED',
          },
        },
      });

      const review = await ctx.prisma.review.create({
        data: {
          ...input,
          userId,
          isVerified: !!hasPurchased,
        },
      });

      return {
        success: true,
        review,
      };
    }),
});