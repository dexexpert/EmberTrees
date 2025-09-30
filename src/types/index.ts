// =============================================================================
// CANNABIS DELIVERY PLATFORM - TYPE DEFINITIONS
// =============================================================================

// Re-export Prisma types
export type {
  User,
  Product,
  ProductVariant,
  Order,
  OrderItem,
  Address,
  Delivery,
  Driver,
  Review,
  Payment,
  LoyaltyAccount,
  Notification,

  // Enums
  Role,
  UserStatus,
  ProductCategory,
  StrainType,
  OrderStatus,
  PaymentStatus,
  DeliveryStatus,
  DriverStatus,
} from '@prisma/client';

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// =============================================================================
// AUTHENTICATION TYPES
// =============================================================================

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  isVerified: boolean;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone?: string;
  agreeToTerms: boolean;
}

export interface AgeVerificationData {
  frontImage: File;
  backImage?: File;
  selfieImage: File;
  idType: 'drivers_license' | 'state_id' | 'passport';
}

// =============================================================================
// PRODUCT TYPES
// =============================================================================

export interface ProductFilters {
  category?: ProductCategory;
  strainType?: StrainType;
  priceMin?: number;
  priceMax?: number;
  thcMin?: number;
  thcMax?: number;
  cbdMin?: number;
  cbdMax?: number;
  inStock?: boolean;
  featured?: boolean;
  search?: string;
}

export interface ProductWithVariants extends Product {
  variants: ProductVariant[];
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  inStock: boolean;
  lowestPrice: number;
  highestPrice: number;
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  product: ProductWithVariants;
  variant: ProductVariant;
}

// =============================================================================
// ORDER TYPES
// =============================================================================

export interface OrderSummary {
  subtotal: number;
  taxAmount: number;
  deliveryFee: number;
  discountAmount: number;
  totalAmount: number;
}

export interface CheckoutData {
  deliveryAddressId: string;
  paymentMethodId: string;
  deliveryNotes?: string;
  scheduledDelivery?: Date;
  loyaltyPointsToUse?: number;
}

export interface OrderWithDetails extends Order {
  items: (OrderItem & {
    product: Product;
    variant: ProductVariant;
  })[];
  deliveryAddress: Address;
  delivery?: Delivery & {
    driver?: Driver;
  };
  user: {
    firstName: string;
    lastName: string;
    phone?: string;
  };
}

// =============================================================================
// DELIVERY TYPES
// =============================================================================

export interface DeliveryTracking {
  orderId: string;
  status: DeliveryStatus;
  estimatedDelivery: Date;
  currentLocation?: {
    latitude: number;
    longitude: number;
    timestamp: Date;
  };
  driver?: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    rating: number;
    vehicle: {
      make: string;
      model: string;
      color: string;
      licensePlate: string;
    };
  };
  route?: {
    distance: number; // in miles
    duration: number; // in minutes
    polyline: string; // encoded polyline
  };
}

export interface DeliveryRoute {
  orders: string[]; // Order IDs
  optimizedStops: {
    orderId: string;
    address: Address;
    estimatedArrival: Date;
    priority: number;
  }[];
  totalDistance: number;
  totalDuration: number;
}

// =============================================================================
// DRIVER TYPES
// =============================================================================

export interface DriverLocation {
  driverId: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
  heading?: number;
  speed?: number;
}

export interface DriverEarnings {
  today: number;
  week: number;
  month: number;
  total: number;
  unpaid: number;
}

export interface DriverStats {
  totalDeliveries: number;
  completionRate: number;
  averageRating: number;
  totalEarnings: number;
  activeHours: number;
}

// =============================================================================
// COMPLIANCE TYPES
// =============================================================================

export interface ComplianceReport {
  period: {
    startDate: Date;
    endDate: Date;
  };
  sales: {
    totalSales: number;
    totalTax: number;
    totalOrders: number;
  };
  inventory: {
    productsReceived: number;
    productsSold: number;
    currentStock: number;
    waste: number;
  };
  customers: {
    newCustomers: number;
    totalCustomers: number;
    ageVerifications: number;
  };
}

export interface LabResult {
  testDate: Date;
  labName: string;
  batchNumber: string;
  results: {
    thc: number;
    cbd: number;
    pesticides: boolean;
    heavyMetals: boolean;
    microbials: boolean;
    residualSolvents: boolean;
    moisture: number;
  };
  passed: boolean;
  certificate?: string; // URL to certificate
}

// =============================================================================
// PAYMENT TYPES
// =============================================================================

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_account';
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
  bankAccount?: {
    routingNumber: string;
    last4: string;
    accountType: string;
  };
  isDefault: boolean;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  clientSecret?: string;
}

// =============================================================================
// NOTIFICATION TYPES
// =============================================================================

export interface NotificationPreferences {
  orderUpdates: boolean;
  deliveryTracking: boolean;
  promotions: boolean;
  newProducts: boolean;
  loyaltyRewards: boolean;
  email: boolean;
  sms: boolean;
  push: boolean;
}

export interface PushNotification {
  title: string;
  body: string;
  icon?: string;
  badge?: number;
  tag?: string;
  data?: Record<string, any>;
  actions?: {
    action: string;
    title: string;
    icon?: string;
  }[];
}

// =============================================================================
// ANALYTICS TYPES
// =============================================================================

export interface BusinessMetrics {
  revenue: {
    today: number;
    week: number;
    month: number;
    year: number;
  };
  orders: {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
  customers: {
    total: number;
    active: number;
    new: number;
  };
  inventory: {
    lowStock: number;
    outOfStock: number;
    totalProducts: number;
  };
}

export interface CustomerAnalytics {
  acquisitionChannels: Array<{
    channel: string;
    customers: number;
    percentage: number;
  }>;
  retentionRate: number;
  averageOrderValue: number;
  lifetimeValue: number;
  churnRate: number;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface ServiceArea {
  zipCode: string;
  city: string;
  state: string;
  deliveryFee: number;
  estimatedDeliveryTime: number; // minutes
  isActive: boolean;
}

export interface BusinessHours {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  isOpen: boolean;
  openTime: string; // "09:00"
  closeTime: string; // "22:00"
}

export interface TaxConfiguration {
  stateRate: number;
  localRate: number;
  exciseRate: number;
  includesDelivery: boolean;
}

// =============================================================================
// FORM TYPES
// =============================================================================

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  orderNumber?: string;
}

export interface ReviewForm {
  rating: number;
  title?: string;
  comment?: string;
  images?: File[];
  wouldRecommend: boolean;
}

export interface AddressForm {
  type: AddressType;
  label?: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  deliveryNotes?: string;
}

// =============================================================================
// ERROR TYPES
// =============================================================================

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// =============================================================================
// WEBSOCKET TYPES
// =============================================================================

export interface SocketEvents {
  // Order events
  'order:status_changed': {
    orderId: string;
    status: OrderStatus;
    timestamp: Date;
  };

  // Delivery events
  'delivery:location_update': DeliveryTracking;
  'delivery:status_changed': {
    deliveryId: string;
    status: DeliveryStatus;
    timestamp: Date;
  };

  // Driver events
  'driver:location_update': DriverLocation;
  'driver:status_changed': {
    driverId: string;
    status: DriverStatus;
    timestamp: Date;
  };

  // Notification events
  'notification:new': Notification;
}

export type SocketEventName = keyof SocketEvents;