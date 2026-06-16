export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  savedAddresses?: Address[];
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

export type FrameMaterial = 'Organic' | 'Heirloom' | 'Non-GMO' | 'Premium';

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number; // Base price for standard unit
  images: string[];
  category: 'Fruits' | 'Vegetables' | 'Seeds' | 'Organic' | 'Equipment';
  style: string; // Farm Style, e.g. "Seasonal Fresh", "Hydroponic", "Direct Share"
  rating: number;
  stock: number;
  materials: FrameMaterial[];
  materialDetails: {
    name: string;
    description: string;
    finish: string; // e.g., "100% Pesticide-Free" or "Direct From Soil"
  }[];
  sizes: {
    label: string; // e.g., "1 Kg Standard", "5 Kg Shared Box", "Pack of 100 Seeds"
    width: number; // relative weight/pack sizes
    height: number;
    multiplier: number; // Price multiplier
  }[];
  colors: {
    name: string; // e.g., "Vine-Ripened Red", "Dwarf Yellow", "Heirloom Dark"
    hex: string;
    priceAdjustment: number;
  }[];
  specifications: Record<string, string>;
  reviews: Review[];
  featured?: boolean;
  bestSeller?: boolean;
}

export interface Review {
  id: string;
  productId?: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  date: string;
  isVerified?: boolean;
}

export interface CustomFrameConfig {
  sourceImage: string; // URL or dataURI representation of your soil/garden layout
  imageName: string;
  frameStyle: string; // e.g., "Drip Irrigation Setup", "Natural Peat Mix", "Hydroponic Nursery"
  material: FrameMaterial;
  width: number; // Garden width in meters
  height: number; // Garden length in meters
  matColor: string; // Fertilizer preference, e.g. "Compost Feed", "Neem Seed Cake", "Bio-Fertilizer", "None"
  matSize: number; // Soil thickness/depth in inches (1 to 12)
  glazing: 'Express Air Courier' | 'Thermo-Regulated Delivery' | 'Standard Farm Direct' | 'Direct Farm Collect';
  price: number;
}

export interface CartItem {
  id: string; // unique cart line ID
  productId?: string; // empty if completely custom bespoked farm share
  product?: Product; // product reference
  customFrame?: CustomFrameConfig; // custom bespoke farm box configuration
  selectedSize?: string;
  selectedColor?: string;
  selectedMaterial?: string;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minSpend?: number;
  description: string;
}

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  details: string; // e.g. "Size: 5 Kg Box, Bio-Fertilizer, Thermo-Regulated"
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  address: Address;
  status: 'Received' | 'In Crafting' | 'Assembling' | 'Shipped' | 'Delivered';
  createdAt: string;
  trackingNumber: string;
  couponUsed?: string;
  paymentDetails: {
    method: string;
    transactionId: string;
    completedAt: string;
  };
}
