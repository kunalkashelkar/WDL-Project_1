export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tag?: string;
  stock: number;
  rating: number;
  specs: string;
  imagePlaceholderBg: string;
  accentIcon: string;
}

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Minimal Wireless Headphones",
    description: "Ultra-low latency active noise cancellation with 40mm custom drivers and 38-hour battery playback.",
    price: 189.00,
    category: "Audio",
    tag: "Best Seller",
    stock: 14,
    rating: 4.9,
    specs: "Bluetooth 5.3 • USB-C Fast Charge • 240g",
    imagePlaceholderBg: "from-slate-900 to-indigo-950",
    accentIcon: "Headphones",
  },
  {
    id: "prod-2",
    name: "Everyday Technical Backpack",
    description: "Weatherproof Cordura 20L daypack with dedicated 16-inch suspended laptop sleeve and magnetic Fidlock clips.",
    price: 135.00,
    category: "Carry",
    tag: "Staff Pick",
    stock: 22,
    rating: 4.8,
    specs: "20L Volume • YKK AquaGuard • 980g",
    imagePlaceholderBg: "from-zinc-900 to-stone-900",
    accentIcon: "Backpack",
  },
  {
    id: "prod-3",
    name: "Mechanical Compact Keyboard",
    description: "75% low-profile CNC aluminum chassis with hot-swappable tactile switches and double-shot PBT keycaps.",
    price: 149.00,
    category: "Peripherals",
    tag: "Popular",
    stock: 9,
    rating: 4.9,
    specs: "Gateron Brown • Mac/Win Layout • QMK/VIA",
    imagePlaceholderBg: "from-slate-900 to-sky-950",
    accentIcon: "Keyboard",
  },
  {
    id: "prod-4",
    name: "Architectural Desk Lamp",
    description: "Precision counterbalanced task light with 97+ CRI glare-free diffused illumination and capacitive dimmer.",
    price: 89.00,
    category: "Lighting",
    stock: 18,
    rating: 4.7,
    specs: "3000K–5000K • 800 Lumens • USB-A Hub",
    imagePlaceholderBg: "from-amber-950/80 to-stone-900",
    accentIcon: "Lamp",
  },
  {
    id: "prod-5",
    name: "Ceramic Vacuum Travel Mug",
    description: "Triple-insulated stainless vessel lined with true ceramic interior to preserve pure roast aroma without metallic aftertaste.",
    price: 36.00,
    category: "Living",
    stock: 35,
    rating: 4.8,
    specs: "16 oz / 470ml • Leakproof 360° Lid",
    imagePlaceholderBg: "from-neutral-900 to-zinc-900",
    accentIcon: "Coffee",
  },
  {
    id: "prod-6",
    name: "Aluminum 10-in-1 USB-C Hub",
    description: "Bus-powered desktop dock with 100W Power Delivery pass-through, dual 4K60Hz display outputs, and SD UHS-II.",
    price: 79.50,
    category: "Peripherals",
    tag: "Essential",
    stock: 12,
    rating: 4.9,
    specs: "Dual HDMI 2.0 • 1Gbps Ethernet • 10Gbps USB-C",
    imagePlaceholderBg: "from-slate-950 to-blue-950",
    accentIcon: "Cpu",
  },
];
