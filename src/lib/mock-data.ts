// =============================================================================
// MOCK DATA FOR FRONTEND DEVELOPMENT
// =============================================================================

export const mockProducts = [
  {
    id: '1',
    name: 'Purple Haze',
    category: 'FLOWER',
    strainType: 'SATIVA',
    brand: 'Premium Gardens',
    thcContent: 22.5,
    cbdContent: 0.8,
    images: ['/images/purple-haze.jpg'],
    description: 'A classic sativa strain with uplifting effects and a sweet, earthy aroma.',
    inStock: true,
    isFeatured: true,
    variants: [
      { id: '1a', name: '1g', price: 15, weight: 1 },
      { id: '1b', name: '3.5g', price: 45, weight: 3.5 },
      { id: '1c', name: '7g', price: 80, weight: 7 },
    ],
    reviews: [],
    averageRating: 4.8,
    totalReviews: 124,
  },
  {
    id: '2',
    name: 'Relaxing Gummies',
    category: 'EDIBLES',
    brand: 'Chill Co',
    thcContent: 10,
    cbdContent: 5,
    images: ['/images/gummies.jpg'],
    description: 'Perfectly dosed gummies for a relaxing evening. 10mg THC per piece.',
    inStock: true,
    isFeatured: true,
    variants: [
      { id: '2a', name: '10 pack', price: 35, weight: 10 },
      { id: '2b', name: '20 pack', price: 60, weight: 20 },
    ],
    reviews: [],
    averageRating: 4.6,
    totalReviews: 89,
  },
];

export const mockUser = {
  id: 'user1',
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Doe',
  isVerified: true,
  ageVerifiedAt: new Date('2023-01-15'),
  addresses: [
    {
      id: 'addr1',
      type: 'HOME',
      street: '123 Main St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      isDeliveryZone: true,
    },
  ],
};

export const mockCart = [
  {
    id: 'cart1',
    productId: '1',
    variantId: '1b',
    quantity: 1,
    product: mockProducts[0],
    variant: mockProducts[0].variants[1],
  },
];

export const mockOrder = {
  id: 'order1',
  orderNumber: 'ORD-001',
  status: 'OUT_FOR_DELIVERY',
  items: mockCart,
  subtotal: 45,
  taxAmount: 6.75,
  deliveryFee: 5,
  totalAmount: 56.75,
  delivery: {
    status: 'IN_TRANSIT',
    estimatedDelivery: new Date(Date.now() + 1800000), // 30 mins from now
    driver: {
      firstName: 'Mike',
      lastName: 'Johnson',
      phone: '+1234567890',
      rating: 4.9,
    },
  },
};