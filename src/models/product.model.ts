export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;

  // Brand and model information
  brand: string;
  model: string;

  // Product details
  features: string[];
  specifications: Record<string, string>;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: string; // e.g., "cm", "in"
  };
  colors?: string[];
  variants?: Variant[];
  sizes?: string[]; // e.g., ["S", "M", "L", "XL"]

  // Shipping and delivery information
  shippingClass?: string;
  freeShipping?: boolean;
  estimatedDelivery?: string; // e.g., "3-5 business days"

  // Inventory and availability
  sku: string;
  stockQuantity: number;
  isAvailable: boolean;

  // Pricing information
  regularPrice: number;
  salePrice?: number;
  discount?: number; // Percentage discount
  currency: string; // e.g., "USD", "EUR"

  // Reviews and ratings
  rating: {
    average: number; // e.g., 4.5
    count: number; // Number of reviews
  };

  // SEO and metadata
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];

  // Additional information
  manufacturer?: string;
  countryOfOrigin?: string;
  warrantyInfo?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;

  // Related products
  relatedProductIds?: string[];

  mainImage: string; //
  images: string[];
  videos?: string[];
}

export interface Variant {
  id: string;
  name: string; // e.g., "Red - M"
  attributes: Record<string, string>; // e.g., { color: "red", size: "M" }
  price: number;
  stockQuantity: number;
}