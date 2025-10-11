import { ProductCategory } from "@/types";

export const PRODUCT_CATEGORIES: { value: ProductCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'flower', label: 'Flower' },
  { value: 'prerolls', label: 'Pre-Rolls' },
  { value: 'edibles', label: 'Edibles' },
  { value: 'concentrates', label: 'Concentrates' },
];
