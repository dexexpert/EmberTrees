// =============================================================================
// CANNABIS DELIVERY PLATFORM - CANNABIS-SPECIFIC CONSTANTS
// =============================================================================

export const CANNABIS_CATEGORIES = {
  FLOWER: 'flower',
  EDIBLES: 'edibles',
  CONCENTRATES: 'concentrates',
  VAPES: 'vapes',
  PREROLLS: 'prerolls',
  TOPICALS: 'topicals',
  ACCESSORIES: 'accessories',
  BEVERAGES: 'beverages',
} as const;

export const STRAIN_TYPES = {
  SATIVA: 'sativa',
  INDICA: 'indica',
  HYBRID: 'hybrid',
} as const;

export const COMPLIANCE = {
  MIN_AGE_RECREATIONAL: 21,
  MIN_AGE_MEDICAL: 18,
  MAX_PURCHASE_LIMIT_FLOWER: 28, // grams per day
  MAX_PURCHASE_LIMIT_CONCENTRATES: 8, // grams per day
  REQUIRED_ID_TYPES: ['drivers_license', 'state_id', 'passport'],
  TAX_RATES: {
    STATE: 0.15,
    LOCAL: 0.05,
    EXCISE: 0.08,
  },
} as const;

export const DELIVERY = {
  MIN_ORDER_AMOUNT: 25.00,
  DELIVERY_FEE: 5.00,
  FREE_DELIVERY_THRESHOLD: 75.00,
  MAX_DELIVERY_DISTANCE: 25, // miles
  DELIVERY_HOURS: {
    START: 9,
    END: 22,
  },
} as const;

export const ORDER_STATUS_FLOW = [
  'PENDING',
  'CONFIRMED',
  'PREPARING',
  'READY',
  'OUT_FOR_DELIVERY',
  'DELIVERED'
] as const;

export const PRODUCT_WEIGHTS = {
  FLOWER: [1, 3.5, 7, 14, 28], // grams
  CONCENTRATES: [0.5, 1, 2, 4, 8], // grams
  EDIBLES: [1, 2, 5, 10, 20], // pieces/servings
} as const;