// =============================================================================
// CANNABIS DELIVERY PLATFORM - CALCULATION UTILITIES
// =============================================================================

import { COMPLIANCE, DELIVERY } from '@/lib/constants/cannabis';

export const calculateAge = (dateOfBirth: Date): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

export const isEligibleForCannabis = (dateOfBirth: Date, hasmedicalCard: boolean = false): boolean => {
  const age = calculateAge(dateOfBirth);
  const minAge = hasmedicalCard ? COMPLIANCE.MIN_AGE_MEDICAL : COMPLIANCE.MIN_AGE_RECREATIONAL;
  return age >= minAge;
};

export const calculateTax = (subtotal: number) => {
  const stateTax = subtotal * COMPLIANCE.TAX_RATES.STATE;
  const localTax = subtotal * COMPLIANCE.TAX_RATES.LOCAL;
  const exciseTax = subtotal * COMPLIANCE.TAX_RATES.EXCISE;

  return {
    stateTax: Math.round(stateTax * 100) / 100,
    localTax: Math.round(localTax * 100) / 100,
    exciseTax: Math.round(exciseTax * 100) / 100,
    totalTax: Math.round((stateTax + localTax + exciseTax) * 100) / 100,
  };
};

export const calculateDeliveryFee = (subtotal: number): number => {
  return subtotal >= DELIVERY.FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY.DELIVERY_FEE;
};

export const calculateOrderTotal = (
  subtotal: number,
  discountAmount: number = 0,
  tipAmount: number = 0
) => {
  const deliveryFee = calculateDeliveryFee(subtotal);
  const taxableAmount = subtotal - discountAmount;
  const { totalTax } = calculateTax(taxableAmount);

  return {
    subtotal,
    discountAmount,
    deliveryFee,
    taxAmount: totalTax,
    tipAmount,
    totalAmount: subtotal + deliveryFee + totalTax + tipAmount - discountAmount,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatWeight = (grams: number): string => {
  if (grams >= 28) {
    const ounces = grams / 28;
    return ounces === 1 ? '1 oz' : `${ounces} oz`;
  }
  return grams === 1 ? '1g' : `${grams}g`;
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};