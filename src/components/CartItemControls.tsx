"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemControlsProps {
  productId: string;
  productName: string;
  quantity: number;
}

/**
 * CLIENT COMPONENT BOUNDARY
 *
 * Why "use client":
 * 1. Contains onClick event handlers for incrementing, decrementing, and removing items.
 * 2. Requires browser interactivity and will directly dispatch actions to the client Zustand store in the next step.
 *
 * Boundary rules:
 * - Only serializable primitives (productId, productName, quantity) cross the server → client boundary.
 * - No callback functions or server instances are passed.
 */
export function CartItemControls({ productId, productName, quantity }: CartItemControlsProps) {
  const handleDecrease = () => {
    console.log(`[Client] Decrease quantity for ${productName} (ID: ${productId})`);
  };

  const handleIncrease = () => {
    console.log(`[Client] Increase quantity for ${productName} (ID: ${productId})`);
  };

  const handleRemove = () => {
    console.log(`[Client] Remove ${productName} (ID: ${productId}) from cart`);
  };

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
          onClick={handleDecrease}
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
          onClick={handleIncrease}
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
        onClick={handleRemove}
      >
        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
      </Button>
    </div>
  );
}
