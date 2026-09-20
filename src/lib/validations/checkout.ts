import { z } from "zod";

/**
 * Shared Checkout Form Validation Schema
 *
 * This schema is designed to be shared across both:
 * 1. Client-side React Hook Form validation via @hookform/resolvers/zod
 * 2. Next.js Server Action server-side validation in the next step
 */
export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Full name can only contain letters, spaces, hyphens, and apostrophes"),

  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please enter a valid email address (e.g. name@example.com)"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(
      /^\+?[0-9\s().-]{10,20}$/,
      "Please enter a valid phone number (at least 10 digits)"
    ),

  address: z
    .string()
    .trim()
    .min(5, "Street address must be at least 5 characters")
    .max(150, "Street address must not exceed 150 characters"),

  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must not exceed 50 characters"),

  postalCode: z
    .string()
    .trim()
    .min(3, "Postal code is required")
    .max(12, "Postal code must not exceed 12 characters")
    .regex(/^[a-zA-Z0-9\s-]+$/, "Postal code contains invalid characters"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
