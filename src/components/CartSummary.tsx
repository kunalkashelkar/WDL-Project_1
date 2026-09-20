import React from "react";
import { Product } from "@/data/products";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartSummaryProps {
  items?: CartItem[];
  emptyState?: boolean;
}

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
            /* Empty Cart State */
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

                  <div className="flex items-center justify-between pt-1">
                    {/* Accessible Quantity Controls */}
                    <div
                      role="group"
                      aria-label={`Quantity controls for ${product.name}`}
                      className="inline-flex items-center rounded-md border border-input bg-background"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        className="h-7 w-7 rounded-none rounded-l-md hover:bg-muted"
                        aria-label={`Decrease quantity of ${product.name}`}
                        disabled={quantity <= 1}
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
                        aria-label={`Increase quantity of ${product.name}`}
                      >
                        <Plus className="h-3 w-3" aria-hidden="true" />
                      </Button>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      aria-label={`Remove ${product.name} from cart`}
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </Button>
                  </div>
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
