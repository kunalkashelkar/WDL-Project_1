import React from "react";
import { Product } from "@/data/products";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Star, Headphones, Package, Keyboard, Lamp, Coffee, Cpu } from "lucide-react";

interface ProductListProps {
  products: Product[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Headphones: <Headphones className="h-10 w-10 stroke-[1.25] text-primary/80" aria-hidden="true" />,
  Backpack: <Package className="h-10 w-10 stroke-[1.25] text-primary/80" aria-hidden="true" />,
  Keyboard: <Keyboard className="h-10 w-10 stroke-[1.25] text-primary/80" aria-hidden="true" />,
  Lamp: <Lamp className="h-10 w-10 stroke-[1.25] text-primary/80" aria-hidden="true" />,
  Coffee: <Coffee className="h-10 w-10 stroke-[1.25] text-primary/80" aria-hidden="true" />,
  Cpu: <Cpu className="h-10 w-10 stroke-[1.25] text-primary/80" aria-hidden="true" />,
};

/**
 * SERVER COMPONENT
 *
 * Statically prerenders product catalog cards on the server.
 * Integrates leaf AddToCartButton client component for interactive store dispatch.
 */
export function ProductList({ products }: ProductListProps) {
  return (
    <section id="products" aria-labelledby="products-heading" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-border/70 pb-4">
        <div>
          <h2 id="products-heading" className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Curated Workspace Hardware
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Designed for productivity, crafted with premium materials.
          </p>
        </div>
        <span className="text-[11px] font-medium text-muted-foreground">
          Showing {products.length} products
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="h-full flex flex-col">
            <Card className="flex h-full flex-col justify-between overflow-hidden border-border/80 bg-card shadow-2xs hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200">
              {/* Product Visual Presentation (Clean minimal placeholder) */}
              <div
                className="h-44 w-full bg-muted/40 flex flex-col items-center justify-center relative p-4 border-b border-border/60 group-hover:bg-muted/60 transition-colors"
                aria-hidden="true"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-background/80 shadow-2xs border border-border/70 text-foreground/80">
                  {ICON_MAP[product.accentIcon] || <Package className="h-7 w-7 text-foreground/70" />}
                </div>

                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-medium tracking-wide text-muted-foreground bg-background/90 px-2.5 py-0.5 rounded-full border border-border/70">
                    {product.category}
                  </span>
                </div>

                {product.tag && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="text-[10px] font-semibold bg-primary/10 text-primary border-primary/20">
                      {product.tag}
                    </Badge>
                  </div>
                )}
              </div>

              <CardHeader className="space-y-1 p-5 pb-2">
                <div className="flex items-center gap-1 text-amber-500 text-[11px] font-medium">
                  <Star className="h-3 w-3 fill-amber-500" aria-hidden="true" />
                  <span>{product.rating}</span>
                  <span className="text-muted-foreground ml-1 font-normal">• {product.specs}</span>
                </div>

                <CardTitle className="text-base font-semibold tracking-tight text-foreground line-clamp-1">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed text-muted-foreground line-clamp-2 h-9">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-5 pt-0 pb-3">
                <div className="flex items-baseline justify-between border-t border-border/40 pt-3">
                  <div>
                    <span className="text-[10px] uppercase font-medium text-muted-foreground block tracking-wider">Price</span>
                    <span className="text-lg font-bold tracking-tight text-foreground tabular-nums">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    {product.stock} in stock
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0">
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
