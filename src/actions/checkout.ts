"use server";

import { checkoutSchema, type CheckoutFormData } from "@/lib/validations/checkout";

export interface CheckoutItemPayload {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CheckoutActionResult {
  success: boolean;
  orderId?: string;
  referenceNumber?: string;
  timestamp?: string;
  customerSummary?: {
    name: string;
    email: string;
    phone: string;
    shippingCity: string;
  };
  totalAmount?: number;
  itemCount?: number;
  error?: string;
  fieldErrors?: Partial<Record<keyof CheckoutFormData, string>>;
}

/**
 * Server Action: processCheckout
 *
 * Implements authoritative server-side validation.
 * Security principle:
 * - Client-side validation is strictly for immediate UX feedback.
 * - Server-side validation with Zod is mandatory and authoritative.
 * - Any bypassed, manipulated, or missing field is rejected here.
 */
export async function processCheckout(
  formData: CheckoutFormData,
  items: CheckoutItemPayload[] = []
): Promise<CheckoutActionResult> {
  // Simulate realistic network latency for the mutation (500ms)
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Authoritative server-side cart validation
  if (!items || items.length === 0) {
    return {
      success: false,
      error: "Cannot process checkout: Shopping cart is empty on the server.",
    };
  }

  // Authoritative server-side Zod validation
  const validationResult = checkoutSchema.safeParse(formData);

  if (!validationResult.success) {
    const fieldErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
    for (const issue of validationResult.error.issues) {
      const field = issue.path[0] as keyof CheckoutFormData;
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }

    return {
      success: false,
      error: "Server-side validation failed. Please check your inputs.",
      fieldErrors,
    };
  }

  const validatedData = validationResult.data;

  // Compute total server-side
  const subtotal = items.reduce(
    (sum, item) => sum + Math.max(0, item.price) * Math.max(1, item.quantity),
    0
  );
  const tax = subtotal * 0.08;
  const totalAmount = Number((subtotal + tax).toFixed(2));
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Generate unique order reference
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  const orderId = `ORD-${Date.now().toString().slice(-6)}-${randomSuffix}`;
  const referenceNumber = `REF-${Math.floor(100000 + Math.random() * 900000)}`;
  const timestamp = new Date().toISOString();

  return {
    success: true,
    orderId,
    referenceNumber,
    timestamp,
    customerSummary: {
      name: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone,
      shippingCity: validatedData.city,
    },
    totalAmount,
    itemCount: totalItemCount,
  };
}
