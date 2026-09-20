import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

export function CheckoutSection() {
  return (
    <section id="checkout" aria-labelledby="checkout-heading" className="space-y-4">
      <div>
        <h2 id="checkout-heading" className="text-xl font-semibold tracking-tight text-foreground">
          Checkout Details
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Enter your shipping and contact information to complete your order.
        </p>
      </div>

      <Card className="border-border shadow-xs">
        <CardHeader className="pb-3 border-b border-border/60">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium">Customer Information</CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Form structure ready for React Hook Form & Zod schema validation.
              </CardDescription>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Lock className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
              <span>SSL Secure</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-5 space-y-4">
          {/* We provide a clean accessible form layout with proper label association */}
          <form id="checkout-form" noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="first-name" className="text-xs font-medium">
                  First Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="first-name"
                  name="firstName"
                  type="text"
                  placeholder="Jane"
                  autoComplete="given-name"
                  aria-required="true"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="last-name" className="text-xs font-medium">
                  Last Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="last-name"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  autoComplete="family-name"
                  aria-required="true"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jane.doe@example.com"
                autoComplete="email"
                aria-required="true"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="address" className="text-xs font-medium">
                Street Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="123 University Way, Apt 4B"
                autoComplete="street-address"
                aria-required="true"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="city" className="text-xs font-medium">
                  City <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="San Jose"
                  autoComplete="address-level2"
                  aria-required="true"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="postal-code" className="text-xs font-medium">
                  Postal Code <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="postal-code"
                  name="postalCode"
                  type="text"
                  placeholder="95192"
                  autoComplete="postal-code"
                  aria-required="true"
                />
              </div>

              <div className="space-y-1.5 col-span-2 sm:col-span-1">
                <Label htmlFor="country" className="text-xs font-medium">
                  Country <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="country"
                  name="country"
                  type="text"
                  defaultValue="United States"
                  autoComplete="country-name"
                  aria-required="true"
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="pt-3 border-t border-border/60 bg-muted/20 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            Review your order before submitting. Server Action processing will be connected next.
          </p>
          <Button
            type="submit"
            form="checkout-form"
            className="w-full sm:w-auto font-medium text-xs px-5 h-9"
          >
            Place Order
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
