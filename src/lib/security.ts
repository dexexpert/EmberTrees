// =============================================================================
// SECURITY UTILITIES FOR CANNABIS DELIVERY PLATFORM
// =============================================================================

import crypto from 'crypto';
import { rateLimit } from 'express-rate-limit';

// Encryption utilities for sensitive data
export const encrypt = (text: string): string => {
  const algorithm = 'aes-256-gcm';
  const secretKey = process.env.ENCRYPTION_KEY!;
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipher(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`;
};

export const decrypt = (encryptedText: string): string => {
  const algorithm = 'aes-256-gcm';
  const secretKey = process.env.ENCRYPTION_KEY!;
  const [ivHex, encrypted] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');

  const decipher = crypto.createDecipher(algorithm, secretKey, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

// Hash sensitive information
export const hashData = (data: string): string => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

// Generate secure tokens
export const generateSecureToken = (length: number = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};

// Age verification utilities
export const verifyAge = (dateOfBirth: string, minAge: number): boolean => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return (age - 1) >= minAge;
  }

  return age >= minAge;
};

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[\/\!]*?[^<>]*?>/gi, '')
    .replace(/[<>]/gi, '')
    .trim();
};

// Rate limiting configurations
export const createRateLimit = (requests: number, windowMs: number) => {
  return rateLimit({
    windowMs,
    max: requests,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Common rate limits
export const rateLimits = {
  // Authentication endpoints
  auth: createRateLimit(5, 15 * 60 * 1000), // 5 attempts per 15 minutes

  // Age verification
  ageVerification: createRateLimit(3, 60 * 60 * 1000), // 3 attempts per hour

  // General API
  api: createRateLimit(100, 15 * 60 * 1000), // 100 requests per 15 minutes

  // Order placement
  orders: createRateLimit(10, 10 * 60 * 1000), // 10 orders per 10 minutes

  // Contact forms
  contact: createRateLimit(5, 60 * 60 * 1000), // 5 messages per hour
};

// Audit logging
export interface AuditLogData {
  userId?: string;
  action: string;
  entity: string;
  entityId: string;
  oldData?: any;
  newData?: any;
  ipAddress?: string;
  userAgent?: string;
}

export const createAuditLog = async (data: AuditLogData) => {
  try {
    // In a real implementation, you would save this to your database
    console.log('Audit Log:', {
      ...data,
      timestamp: new Date().toISOString(),
    });

    // Example Prisma call (uncomment when ready):
    // await prisma.auditLog.create({
    //   data: {
    //     ...data,
    //     userId: data.userId || 'system',
    //   },
    // });
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
};

// IP address utilities
export const getClientIP = (req: Request): string => {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIP = req.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return 'unknown';
};

// Content Security Policy
export const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://maps.googleapis.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: https://*.amazonaws.com https://*.cloudinary.com;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.stripe.com https://api.mapbox.com;
  frame-src https://js.stripe.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();