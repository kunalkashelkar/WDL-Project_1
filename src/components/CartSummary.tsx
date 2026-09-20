"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, RotateCcw } from "lucide-react";
import { CartItemControls } from "@/components/CartItemControls";
import {
  useCartStore,
  selectCartItems,
  selectSubtotal,
  selectClearCart,
} from "@/store/useCartStore";
import { useMounted } from "@/hooks/useMounted";

/**
 * CLIENT COMPONENT BOUNDARY
 *
 * Subscribes to:
 * - selectCartItems (item array)
 * - selectSubtotal (computed order cost)
 * - selectClearCart (action to empty cart)
 *
 * Hydration handling:
 * - Uses `useMounted` to guard against hydration discrepancies between server HTML (empty cart)
 *   and localStorage-persisted cart state on the client.
 */
export function CartSummary() {
  const mounted = useMounted();
  const items = useCartStore(selectCartItems);
  const subtotal = useCartStore(selectSubtotal);
  const clearCart = useCartStore(selectClearCart);

  // Before hydration on the client, render an empty state or skeleton that matches SSR exactly
  const displayItems = mounted ? items : [];
  const displaySubtotal = mounted ? subtotal : 0;
  const tax = displaySubtotal > 0 ? displaySubtotal * 0.08 : 0;
  const total = displaySubtotal + tax;

  return (
    <section id="cart" aria-labelledby="cart-heading" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 id="cart-heading" className="text-xl font-semibold tracking-tight text-foreground">
            Order Summary
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Review items in your cart before checking out.
          </p>
        </div>
        {displayItems.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={clearCart}
            className="text-xs text-muted-foreground hover:text-destructive gap-1.5 cursor-pointer"
            aria-label="Clear all items from shopping cart"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            Clear
          </Button>
        )}
      </div>

      <Card className="border-border/80 bg-card/90 shadow-2xs backdrop-blur-xs">
        <CardHeader className="p-5 pb-3 border-b border-border/60 bg-muted/10">
          <CardTitle className="text-sm font-semibold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span>Cart Items</span>
            </span>
            <span className="text-xs text-muted-foreground font-normal bg-background px-2.5 py-0.5 rounded-md border border-border/60">
              {displayItems.length} {displayItems.length === 1 ? "item" : "items"}
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-5 pt-3">
          {displayItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/80 text-muted-foreground mb-3 border border-border/50">
                <ShoppingCart className="h-5 w-5 stroke-[1.5]" aria-hidden="true" />
              </div>
              <p className="text-sm font-semibold text-foreground">Your cart is empty</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs leading-relaxed">
                Add a product to get started.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-4 text-xs font-medium cursor-pointer">
                <a href="#products">
                  Browse products
                </a>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-border/60" aria-label="Cart items list">
              {displayItems.map((item) => (
                <li key={item.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5 min-w-0">
                      <h3 className="text-xs font-semibold text-foreground truncate">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-muted-foreground">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <span className="text-xs font-bold text-foreground tabular-nums shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity and removal controls */}
                  <CartItemControls
                    productId={item.id}
                    productName={item.name}
                    quantity={item.quantity}
                  />
                </li>
              ))}
            </ul>
          )}
        </CardContent>

        {displayItems.length > 0 && (
          <CardFooter className="flex flex-col gap-3 p-5 pt-3 border-t border-border/60 bg-muted/10">
            <dl className="w-full space-y-1.5 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <dt>Subtotal</dt>
                <dd className="tabular-nums font-medium text-foreground">
                  ${displaySubtotal.toFixed(2)}
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

            <Button asChild size="default" className="w-full text-xs font-semibold mt-1 cursor-pointer shadow-xs">
              <Link href="/checkout">
                Proceed to Checkout
              </Link>
            </Button>
          </CardFooter>
        )}
      </Card>
    </section>
  );
}
