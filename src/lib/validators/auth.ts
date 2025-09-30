// =============================================================================
// AUTHENTICATION & USER VALIDATION SCHEMAS
// =============================================================================

import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain uppercase, lowercase, number and special character'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number').optional(),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to terms'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const ageVerificationSchema = z.object({
  idType: z.enum(['drivers_license', 'state_id', 'passport']),
  frontImage: z.instanceof(File).refine(
    file => file.size <= 10000000, // 10MB
    'File size must be less than 10MB'
  ),
  backImage: z.instanceof(File).optional(),
  selfieImage: z.instanceof(File).refine(
    file => file.size <= 10000000,
    'File size must be less than 10MB'
  ),
});

export const profileUpdateSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/).optional(),
  avatar: z.string().url().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type AgeVerificationInput = z.infer<typeof ageVerificationSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;