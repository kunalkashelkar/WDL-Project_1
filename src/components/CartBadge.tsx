"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCartStore, selectTotalItemCount } from "@/store/useCartStore";
import { useMounted } from "@/hooks/useMounted";

export function CartBadge() {
  // Subscribe ONLY to total item count selector to prevent re-rendering on unrelated changes
  const itemCount = useCartStore(selectTotalItemCount);
  const mounted = useMounted();

  // Render a stable SSR/hydration footprint to prevent layout shift or attribute mismatches
  const displayCount = mounted ? itemCount : 0;

  return (
    <Link
      href="#cart"
      className="inline-flex h-9 items-center gap-2 rounded-lg border border-border/80 bg-card px-3 text-sm font-medium transition-all hover:bg-accent/50 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-2xs"
      aria-label={`View shopping cart with ${displayCount} items`}
    >
      <ShoppingBag className="h-4 w-4 text-primary" aria-hidden="true" />
      <span className="hidden sm:inline font-medium">Cart</span>
      <Badge variant="default" className="px-1.5 py-0 text-xs tabular-nums font-semibold bg-primary text-primary-foreground">
        {displayCount}
      </Badge>
    </Link>
  );
}
