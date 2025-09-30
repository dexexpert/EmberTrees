// =============================================================================
// ROOT TRPC ROUTER - CANNABIS DELIVERY PLATFORM
// =============================================================================

import { createTRPCRouter } from '@/lib/api/trpc';
import { authRouter } from '@/lib/api/routers/auth';
import { productsRouter } from '@/lib/api/routers/products';

/**
 * This is the primary router for the cannabis delivery platform.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  products: productsRouter,
  // orders: ordersRouter,        // TODO: Implement
  // cart: cartRouter,            // TODO: Implement
  // delivery: deliveryRouter,    // TODO: Implement
  // payments: paymentsRouter,    // TODO: Implement
  // admin: adminRouter,          // TODO: Implement
  // driver: driverRouter,        // TODO: Implement
  // compliance: complianceRouter, // TODO: Implement
});

// Export type definition of API
export type AppRouter = typeof appRouter;