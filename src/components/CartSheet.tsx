"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  useCartStore,
  selectCartItems,
  selectTotalItemCount,
  selectSubtotal,
  selectIncrementQuantity,
  selectDecrementQuantity,
  selectRemoveItem,
  selectClearCart,
} from "@/store/useCartStore";
import { useMounted } from "@/hooks/useMounted";

export function CartSheet() {
  const [open, setOpen] = useState(false);
  const mounted = useMounted();
  const items = useCartStore(selectCartItems);
  const itemCount = useCartStore(selectTotalItemCount);
  const subtotal = useCartStore(selectSubtotal);
  const incrementQuantity = useCartStore(selectIncrementQuantity);
  const decrementQuantity = useCartStore(selectDecrementQuantity);
  const removeItem = useCartStore(selectRemoveItem);
  const clearCart = useCartStore(selectClearCart);

  const displayCount = mounted ? itemCount : 0;
  const displayItems = mounted ? items : [];
  const displaySubtotal = mounted ? subtotal : 0;
  const tax = displaySubtotal > 0 ? displaySubtotal * 0.08 : 0;
  const total = displaySubtotal + tax;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="relative inline-flex h-9 items-center gap-2 rounded-lg border border-border/80 bg-card px-3 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-2xs cursor-pointer"
          aria-label={`Shopping cart with ${displayCount} items`}
        >
          <ShoppingBag className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="hidden sm:inline">Cart</span>
          <Badge variant="default" className="px-1.5 py-0 text-[11px] font-semibold tabular-nums">
            {displayCount}
          </Badge>
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col justify-between p-0 bg-card text-card-foreground border-l border-border/80 shadow-2xl"
      >
        {/* Drawer Header */}
        <SheetHeader className="px-6 py-4 border-b border-border/70 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <SheetTitle className="text-base font-semibold tracking-tight">Your Cart</SheetTitle>
            <Badge variant="secondary" className="text-xs px-2">
              {displayItems.length} {displayItems.length === 1 ? "item" : "items"}
            </Badge>
          </div>
          {displayItems.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors cursor-pointer mr-6"
            >
              Clear all
            </button>
          )}
        </SheetHeader>

        {/* Drawer Content / List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {displayItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/80 text-muted-foreground mb-4">
                <ShoppingBag className="h-7 w-7 stroke-[1.5]" aria-hidden="true" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Your cart is empty</h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs leading-relaxed">
                Explore our curated desk gear and workspace accessories to get started.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-5 text-xs font-medium cursor-pointer"
                onClick={() => setOpen(false)}
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-border/60" aria-label="Items currently in shopping cart">
              {displayItems.map((item) => (
                <li key={item.id} className="py-4 first:pt-0 last:pb-0 flex flex-col gap-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="text-xs font-semibold text-foreground truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <span className="text-xs font-bold text-foreground tabular-nums shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div
                      role="group"
                      aria-label={`Quantity controls for ${item.name}`}
                      className="inline-flex items-center rounded-md border border-border/80 bg-background"
                    >
                      <button
                        type="button"
                        onClick={() => decrementQuantity(item.id)}
                        disabled={item.quantity <= 1}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="h-7 w-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-l-md disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
                      >
                        <Minus className="h-3 w-3" aria-hidden="true" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold tabular-nums text-foreground min-w-[24px] text-center" aria-live="polite">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => incrementQuantity(item.id)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="h-7 w-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-r-md cursor-pointer"
                      >
                        <Plus className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="text-muted-foreground hover:text-destructive p-1 rounded-md transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Drawer Footer / Checkout CTA */}
        {displayItems.length > 0 && (
          <div className="border-t border-border/60 bg-muted/10 p-6 space-y-4">
            <dl className="space-y-2 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <dt>Subtotal</dt>
                <dd className="tabular-nums font-medium text-foreground">
                  ${displaySubtotal.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Shipping</dt>
                <dd className="font-medium text-emerald-600 dark:text-emerald-400">
                  Complimentary
                </dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Estimated Tax (8%)</dt>
                <dd className="tabular-nums font-medium text-foreground">
                  ${tax.toFixed(2)}
                </dd>
              </div>
              <Separator className="my-1.5" />
              <div className="flex justify-between text-sm font-bold text-foreground">
                <dt>Total</dt>
                <dd className="tabular-nums">${total.toFixed(2)}</dd>
              </div>
            </dl>

            <Button
              asChild
              size="lg"
              className="w-full text-xs sm:text-sm font-semibold cursor-pointer shadow-xs gap-2"
              onClick={() => setOpen(false)}
            >
              <Link href="/checkout">
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
