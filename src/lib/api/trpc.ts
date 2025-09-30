// =============================================================================
// tRPC CONFIGURATION FOR CANNABIS DELIVERY PLATFORM
// =============================================================================

import { initTRPC, TRPCError } from '@trpc/server';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import type { Session } from 'next-auth';

// =============================================================================
// CONTEXT CREATION
// =============================================================================

interface CreateContextOptions {
  session: Session | null;
}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const session = await getServerAuthSession({ req, res });

  return createInnerTRPCContext({
    session,
  });
};

// =============================================================================
// tRPC INITIALIZATION
// =============================================================================

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

// =============================================================================
// MIDDLEWARE
// =============================================================================

// Public procedures (no auth required)
export const publicProcedure = t.procedure;

// Auth middleware
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

// Protected procedures (auth required)
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

// Admin middleware
const enforceUserIsAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  if (ctx.session.user.role !== 'ADMIN' && ctx.session.user.role !== 'MANAGER') {
    throw new TRPCError({ code: 'FORBIDDEN' });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

// Admin procedures
export const adminProcedure = t.procedure.use(enforceUserIsAdmin);

// Driver middleware
const enforceUserIsDriver = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  if (ctx.session.user.role !== 'DRIVER') {
    throw new TRPCError({ code: 'FORBIDDEN' });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

// Driver procedures
export const driverProcedure = t.procedure.use(enforceUserIsDriver);

// Age verification middleware
const enforceAgeVerification = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const user = await ctx.prisma.user.findUnique({
    where: { id: ctx.session.user.id },
    select: { isVerified: true, ageVerifiedAt: true },
  });

  if (!user?.isVerified || !user.ageVerifiedAt) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Age verification required',
    });
  }

  return next();
});

// Age-verified procedures (for cannabis purchases)
export const ageVerifiedProcedure = protectedProcedure.use(enforceAgeVerification);