// =============================================================================
// AUTHENTICATION TRPC ROUTER
// =============================================================================

import { z } from 'zod';
import { hash, compare } from 'bcryptjs';
import { TRPCError } from '@trpc/server';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '@/lib/api/trpc';
import { loginSchema, registerSchema, ageVerificationSchema } from '@/lib/validators/auth';
import { generateSecureToken, createAuditLog } from '@/lib/security';
import { COMPLIANCE } from '@/lib/constants/cannabis';
import { calculateAge, isEligibleForCannabis } from '@/lib/utils/calculations';

export const authRouter = createTRPCRouter({
  // User registration
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password, firstName, lastName, dateOfBirth, phone, agreeToTerms } = input;

      // Check if user already exists
      const existingUser = await ctx.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User with this email already exists',
        });
      }

      // Verify age eligibility
      const age = calculateAge(new Date(dateOfBirth));
      if (age < COMPLIANCE.MIN_AGE_RECREATIONAL) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `Must be at least ${COMPLIANCE.MIN_AGE_RECREATIONAL} years old to register`,
        });
      }

      // Hash password
      const hashedPassword = await hash(password, 12);

      // Create user
      const user = await ctx.prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          dateOfBirth: new Date(dateOfBirth),
          phone,
          // password: hashedPassword, // Uncomment when password field exists
        },
      });

      // Create audit log
      await createAuditLog({
        action: 'USER_REGISTERED',
        entity: 'user',
        entityId: user.id,
        newData: { email, firstName, lastName, age },
      });

      return {
        success: true,
        message: 'Account created successfully. Please verify your email.',
        userId: user.id,
      };
    }),

  // Age verification upload
  submitAgeVerification: protectedProcedure
    .input(z.object({
      idType: z.enum(['drivers_license', 'state_id', 'passport']),
      frontImageUrl: z.string().url(),
      backImageUrl: z.string().url().optional(),
      selfieImageUrl: z.string().url(),
    }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      // Check if already verified
      const user = await ctx.prisma.user.findUnique({
        where: { id: userId },
        select: { isVerified: true, ageVerifiedAt: true },
      });

      if (user?.isVerified && user?.ageVerifiedAt) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Age verification already completed',
        });
      }

      // Store verification documents (in production, this would integrate with ID verification service)
      const verificationData = {
        idType: input.idType,
        frontImage: input.frontImageUrl,
        backImage: input.backImageUrl,
        selfieImage: input.selfieImageUrl,
        submittedAt: new Date(),
        status: 'PENDING',
      };

      await ctx.prisma.user.update({
        where: { id: userId },
        data: {
          verificationDocs: verificationData,
        },
      });

      // Create audit log
      await createAuditLog({
        userId,
        action: 'AGE_VERIFICATION_SUBMITTED',
        entity: 'user',
        entityId: userId,
        newData: { idType: input.idType, status: 'PENDING' },
      });

      return {
        success: true,
        message: 'Age verification documents submitted. Review typically takes 24-48 hours.',
      };
    }),

  // Get current user profile
  getProfile: protectedProcedure
    .query(async ({ ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          avatar: true,
          role: true,
          status: true,
          isVerified: true,
          ageVerifiedAt: true,
          dateOfBirth: true,
          addresses: {
            select: {
              id: true,
              type: true,
              label: true,
              street: true,
              apartment: true,
              city: true,
              state: true,
              zipCode: true,
              isDeliveryZone: true,
            },
          },
          loyaltyAccount: {
            select: {
              points: true,
              tier: true,
            },
          },
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      const age = calculateAge(user.dateOfBirth);
      const isEligible = isEligibleForCannabis(user.dateOfBirth);

      return {
        ...user,
        age,
        isEligible,
        canPurchase: user.isVerified && isEligible,
      };
    }),

  // Update user profile
  updateProfile: protectedProcedure
    .input(z.object({
      firstName: z.string().min(2).optional(),
      lastName: z.string().min(2).optional(),
      phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/).optional(),
      avatar: z.string().url().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      const updatedUser = await ctx.prisma.user.update({
        where: { id: userId },
        data: input,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          phone: true,
          avatar: true,
        },
      });

      // Create audit log
      await createAuditLog({
        userId,
        action: 'PROFILE_UPDATED',
        entity: 'user',
        entityId: userId,
        newData: input,
      });

      return {
        success: true,
        user: updatedUser,
      };
    }),

  // Request password reset
  requestPasswordReset: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
        select: { id: true, email: true, firstName: true },
      });

      if (!user) {
        // Don't reveal if email exists
        return {
          success: true,
          message: 'If an account with that email exists, we\'ve sent a password reset link.',
        };
      }

      // Generate reset token
      const resetToken = generateSecureToken();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      // In production, save reset token to database and send email
      console.log(`Password reset token for ${user.email}: ${resetToken}`);

      // Create audit log
      await createAuditLog({
        userId: user.id,
        action: 'PASSWORD_RESET_REQUESTED',
        entity: 'user',
        entityId: user.id,
      });

      return {
        success: true,
        message: 'If an account with that email exists, we\'ve sent a password reset link.',
      };
    }),
});