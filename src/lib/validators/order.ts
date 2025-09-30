// =============================================================================
// ORDER & CART VALIDATION SCHEMAS
// =============================================================================

import { z } from 'zod';

export const addToCartSchema = z.object({
  productId: z.string().cuid('Invalid product ID'),
  variantId: z.string().cuid('Invalid variant ID'),
  quantity: z.number().min(1, 'Quantity must be at least 1').max(10, 'Maximum quantity is 10'),
});

export const updateCartItemSchema = z.object({
  itemId: z.string().cuid('Invalid item ID'),
  quantity: z.number().min(0, 'Quantity cannot be negative').max(10, 'Maximum quantity is 10'),
});

export const addressSchema = z.object({
  type: z.enum(['HOME', 'WORK', 'OTHER']),
  label: z.string().optional(),
  street: z.string().min(5, 'Street address is required'),
  apartment: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().length(2, 'State must be 2 characters'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  deliveryNotes: z.string().max(500, 'Delivery notes too long').optional(),
});

export const checkoutSchema = z.object({
  deliveryAddressId: z.string().cuid('Invalid delivery address'),
  paymentMethodId: z.string().cuid('Invalid payment method'),
  deliveryNotes: z.string().max(500).optional(),
  scheduledDelivery: z.date().optional(),
  loyaltyPointsToUse: z.number().min(0).optional(),
  tipAmount: z.number().min(0).max(100).optional(),
});

export const orderFilterSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED']).optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(10),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type OrderFilterInput = z.infer<typeof orderFilterSchema>;