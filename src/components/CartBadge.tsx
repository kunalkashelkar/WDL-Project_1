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
      className="inline-flex h-9 items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`View shopping cart with ${displayCount} items`}
    >
      <ShoppingBag className="h-4 w-4 text-foreground" aria-hidden="true" />
      <span className="hidden sm:inline">Cart</span>
      <Badge variant="secondary" className="px-1.5 py-0 text-xs tabular-nums">
        {displayCount}
      </Badge>
    </Link>
  );
}
