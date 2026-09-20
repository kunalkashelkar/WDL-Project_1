import React from "react";
import { Product } from "@/data/products";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProductListProps {
  products: Product[];
}

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
            <Card className="flex h-full flex-col justify-between border-border shadow-xs hover:border-foreground/20 transition-colors">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                    {product.category}
                  </span>
                  {product.tag && (
                    <Badge variant="secondary" className="text-xs">
                      {product.tag}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-base font-semibold leading-snug">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-bold tracking-tight text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-muted-foreground" aria-label={`In stock: ${product.stock} items`}>
                    {product.stock} in stock
                  </span>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-center gap-2 text-xs font-medium cursor-pointer"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </article>
        ))}
      </div>
    </section>
  );
}
