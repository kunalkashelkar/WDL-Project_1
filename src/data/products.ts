export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tag?: string;
  stock: number;
}

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Ergonomic Mechanical Keyboard",
    description: "Compact 75% hot-swappable tactile keyboard with sound-dampening foam and PBT keycaps.",
    price: 119.99,
    category: "Peripherals",
    tag: "Best Seller",
    stock: 12,
  },
  {
    id: "prod-2",
    name: "Ultra-Lightweight Wireless Mouse",
    description: "58-gram optical mouse with low-latency 2.4GHz connection and 80-hour battery life.",
    price: 69.50,
    category: "Peripherals",
    tag: "Popular",
    stock: 18,
  },
  {
    id: "prod-3",
    name: "USB-C Dual 4K Docking Station",
    description: "10-in-1 aluminum desktop hub with 100W Power Delivery and dual HDMI 2.1 display support.",
    price: 149.00,
    category: "Accessories",
    stock: 7,
  },
  {
    id: "prod-4",
    name: "Desk Mat Wool Felt & Vegan Leather",
    description: "Spacious 900x400mm dual-sided surface for precise sensor tracking and wrist comfort.",
    price: 34.00,
    category: "Accessories",
    stock: 25,
  },
  {
    id: "prod-5",
    name: "Noise-Isolating Studio Earbuds",
    description: "Balanced armature in-ear monitors with braided detachable MMCX cable and memory foam tips.",
    price: 89.99,
    category: "Audio",
    tag: "Staff Pick",
    stock: 9,
  },
  {
    id: "prod-6",
    name: "ScreenBar Monitor Light Bar",
    description: "Asymmetric desk glare-free LED lamp with touch brightness controls and color temperature presets.",
    price: 54.95,
    category: "Lighting",
    stock: 14,
  },
];
