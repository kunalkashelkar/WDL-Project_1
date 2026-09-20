"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
}

/**
 * CLIENT COMPONENT BOUNDARY
 *
 * Why "use client":
 * 1. Attaches an interactive onClick event handler to capture user addition to the cart.
 * 2. Will integrate directly with the client-side state store (Zustand) in the next step.
 *
 * Props crossed:
 * - Only primitive serializable values (productId, productName, price) are passed from
 *   the Server Component parent (ProductList).
 */
export function AddToCartButton({ productId, productName, price }: AddToCartButtonProps) {
  const handleAddToCart = () => {
    // Demonstration event handler - client-side state store (Zustand) will be wired here
    console.log(`[Client] Added to cart: ${productName} (ID: ${productId}, Price: $${price})`);
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleAddToCart}
      className="w-full justify-center gap-2 text-xs font-medium cursor-pointer"
      aria-label={`Add ${productName} to cart`}
    >
      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
      Add to Cart
    </Button>
  );
}
