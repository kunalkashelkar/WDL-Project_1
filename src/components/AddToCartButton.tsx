"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCartStore, selectAddItem } from "@/store/useCartStore";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
}

/**
 * CLIENT COMPONENT BOUNDARY
 *
 * Subscribes ONLY to the addItem action selector from useCartStore.
 * Since actions are stable function references, this component NEVER re-renders
 * when other parts of the cart state (such as item counts or subtotals) change.
 */
export function AddToCartButton({ productId, productName, price }: AddToCartButtonProps) {
  const addItem = useCartStore(selectAddItem);

  const handleAddToCart = () => {
    addItem({
      id: productId,
      name: productName,
      price,
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleAddToCart}
      className="w-full justify-center gap-2 text-xs font-medium cursor-pointer"
      aria-label={`Add to Cart: ${productName}`}
    >
      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
      Add to Cart
    </Button>
  );
}
