import React from "react";
import Link from "next/link";
import { ShoppingBag, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartCount?: number;
}

export function Header({ cartCount = 2 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-lg tracking-tight text-foreground transition-colors hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            aria-label="CartFlow Home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              CF
            </span>
            <span>CartFlow</span>
          </Link>

          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-5 text-sm">
            <Link
              href="#products"
              className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1 py-0.5"
            >
              Products
            </Link>
            <Link
              href="#cart"
              className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1 py-0.5"
            >
              Cart Summary
            </Link>
            <Link
              href="#checkout"
              className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1 py-0.5"
            >
              Checkout
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme toggle placeholder */}
          <Button
            variant="outline"
            size="icon"
            type="button"
            aria-label="Toggle visual theme (placeholder for next-themes)"
            className="h-9 w-9 text-muted-foreground"
            title="Theme toggle (placeholder)"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden="true" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Cart trigger / indicator */}
          <Link
            href="#cart"
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`View shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="h-4 w-4 text-foreground" aria-hidden="true" />
            <span className="hidden sm:inline">Cart</span>
            <Badge variant="secondary" className="px-1.5 py-0 text-xs">
              {cartCount}
            </Badge>
          </Link>
        </div>
      </div>
    </header>
  );
}
