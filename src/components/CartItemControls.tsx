"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  useCartStore,
  selectIncrementQuantity,
  selectDecrementQuantity,
  selectRemoveItem,
} from "@/store/useCartStore";

interface CartItemControlsProps {
  productId: string;
  productName: string;
  quantity: number;
}

/**
 * CLIENT COMPONENT BOUNDARY
 *
 * Uses stable action selectors to mutate cart item quantities without causing
 * unnecessary cascading re-renders across the component tree.
 */
export function CartItemControls({ productId, productName, quantity }: CartItemControlsProps) {
  const incrementQuantity = useCartStore(selectIncrementQuantity);
  const decrementQuantity = useCartStore(selectDecrementQuantity);
  const removeItem = useCartStore(selectRemoveItem);

  return (
    <div className="flex items-center justify-between pt-1">
      {/* Accessible Quantity Controls */}
      <div
        role="group"
        aria-label={`Quantity controls for ${productName}`}
        className="inline-flex items-center rounded-md border border-input bg-background"
      >
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="h-7 w-7 rounded-none rounded-l-md hover:bg-muted"
          aria-label={`Decrease quantity of ${productName}`}
          disabled={quantity <= 1}
          onClick={() => decrementQuantity(productId)}
        >
          <Minus className="h-3 w-3" aria-hidden="true" />
        </Button>
        <span
          className="px-3 text-xs font-semibold tabular-nums text-foreground min-w-[28px] text-center"
          aria-live="polite"
          aria-atomic="true"
        >
          {quantity}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="h-7 w-7 rounded-none rounded-r-md hover:bg-muted"
          aria-label={`Increase quantity of ${productName}`}
          onClick={() => incrementQuantity(productId)}
        >
          <Plus className="h-3 w-3" aria-hidden="true" />
        </Button>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        aria-label={`Remove ${productName} from cart`}
        onClick={() => removeItem(productId)}
      >
        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
      </Button>
    </div>
  );
}
