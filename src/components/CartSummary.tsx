import React from "react";
import { Product } from "@/data/products";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";
import { CartItemControls } from "@/components/CartItemControls";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartSummaryProps {
  items?: CartItem[];
  emptyState?: boolean;
}

/**
 * SERVER COMPONENT
 *
 * Why Server Component:
 * - Computes order pricing (subtotal, tax, total) on the server without sending financial calculation code
 *   or static markup structure to client bundles.
 * - Renders the static card wrappers, headings, item descriptions, and totals as pure HTML.
 * - Only the interactive quantity buttons and delete triggers delegate to the <CartItemControls /> Client Component.
 *
 * Props passed across the boundary:
 * - Only primitive serializable values (productId, productName, quantity).
 */
export function CartSummary({ items = [], emptyState = false }: CartSummaryProps) {
  const displayItems = emptyState ? [] : items;
  const subtotal = displayItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const tax = subtotal > 0 ? subtotal * 0.08 : 0;
  const total = subtotal + tax;

  return (
    <section id="cart" aria-labelledby="cart-heading" className="space-y-4">
      <div>
        <h2 id="cart-heading" className="text-xl font-semibold tracking-tight text-foreground">
          Order Summary
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Review items in your cart before checking out.
        </p>
      </div>

      <Card className="border-border shadow-xs">
        <CardHeader className="pb-3 border-b border-border/60">
          <CardTitle className="text-sm font-medium flex items-center justify-between">
            <span>Cart Items</span>
            <span className="text-xs text-muted-foreground font-normal">
              {displayItems.length} {displayItems.length === 1 ? "item" : "items"}
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-4">
          {displayItems.length === 0 ? (
            /* Empty Cart State - 100% static server-rendered HTML */
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-3">
                <ShoppingCart className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="text-sm font-medium text-foreground">Your cart is empty</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                Browse our available products and add items to your cart to begin checkout.
              </p>
            </div>
          ) : (
            /* Cart Item List */
            <ul className="divide-y divide-border/60" aria-label="Cart items list">
              {displayItems.map(({ product, quantity }) => (
                <li key={product.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5 min-w-0">
                      <h3 className="text-sm font-medium text-foreground truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        ${product.price.toFixed(2)} each
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-foreground shrink-0">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Client Component boundary: Only quantity buttons hydrate */}
                  <CartItemControls
                    productId={product.id}
                    productName={product.name}
                    quantity={quantity}
                  />
                </li>
              ))}
            </ul>
          )}
        </CardContent>

        {displayItems.length > 0 && (
          <CardFooter className="flex flex-col gap-3 pt-3 border-t border-border/60 bg-muted/20">
            <dl className="w-full space-y-1.5 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <dt>Subtotal</dt>
                <dd className="tabular-nums font-medium text-foreground">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Estimated Tax (8%)</dt>
                <dd className="tabular-nums font-medium text-foreground">${tax.toFixed(2)}</dd>
              </div>
              <Separator className="my-1.5" />
              <div className="flex justify-between text-sm font-semibold text-foreground">
                <dt>Total</dt>
                <dd className="tabular-nums font-bold">${total.toFixed(2)}</dd>
              </div>
            </dl>
          </CardFooter>
        )}
      </Card>
    </section>
  );
}
