import React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CartSheet } from "@/components/CartSheet";

/**
 * SERVER COMPONENT
 *
 * Statically renders navbar shell, brand logo, and navigation links.
 * Incorporates:
 * - <ThemeToggle /> (Client Component) for theme dropdown
 * - <CartSheet /> (Client Component) for the responsive sliding cart drawer
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-md supports-backdrop-filter:bg-background/80">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-semibold text-base tracking-tight text-foreground transition-colors hover:text-foreground/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          >
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xs shadow-xs"
            >
              CF
            </span>
            <span className="font-bold tracking-tight">CartFlow</span>
          </Link>

          <nav aria-label="Main Navigation" className="hidden sm:flex items-center gap-6 text-xs font-medium">
            <Link
              href="/#products"
              className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1 py-0.5"
            >
              Products
            </Link>
            <Link
              href="/checkout"
              className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1 py-0.5"
            >
              Checkout
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Accessible Theme Switcher */}
          <ThemeToggle />

          {/* Interactive Slide-out Cart Sheet */}
          <CartSheet />
        </div>
      </div>
    </header>
  );
}
