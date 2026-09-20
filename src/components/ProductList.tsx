import React from "react";
import { Product } from "@/data/products";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/AddToCartButton";

interface ProductListProps {
  products: Product[];
}

/**
 * SERVER COMPONENT
 *
 * Why Server Component:
 * - Renders the product grid statically on the server without sending catalog rendering logic to the client JS bundle.
 * - Leaves interactive event handlers isolated to the leaf <AddToCartButton /> client boundary.
 *
 * Props passed to Client Component:
 * - Purely serializable primitives (productId, productName, price).
 */
export function ProductList({ products }: ProductListProps) {
  return (
    <section id="products" aria-labelledby="products-heading" className="space-y-6">
      <div>
        <h2 id="products-heading" className="text-2xl font-semibold tracking-tight text-foreground">
          Available Products
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Explore our curated tech desk peripherals and workspace essentials.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="h-full">
            <Card className="flex h-full flex-col justify-between border-border/80 bg-card/90 shadow-2xs hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200">
              <CardHeader className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-primary/90 bg-primary/10 px-2 py-0.5 rounded-md">
                    {product.category}
                  </span>
                  {product.tag && (
                    <Badge variant="secondary" className="text-[11px] font-medium border-border/60">
                      {product.tag}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-base font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-2">
                <div className="flex items-baseline justify-between border-t border-border/40 pt-3">
                  <div>
                    <span className="text-xs text-muted-foreground block text-[11px]">Price</span>
                    <span className="text-xl font-bold tracking-tight text-foreground">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full" aria-label={`In stock: ${product.stock} items`}>
                    {product.stock} in stock
                  </span>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                {/* Client component boundary: only interactive button hydrates */}
                <AddToCartButton
                  productId={product.id}
                  productName={product.name}
                  price={product.price}
                />
              </CardFooter>
            </Card>
          </article>
        ))}
      </div>
    </section>
  );
}
