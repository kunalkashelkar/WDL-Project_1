"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutFormData } from "@/lib/validations/checkout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, CheckCircle2, AlertCircle } from "lucide-react";
import { useCartStore, selectCartItems, selectTotalItemCount } from "@/store/useCartStore";
import { useMounted } from "@/hooks/useMounted";

/**
 * CLIENT COMPONENT BOUNDARY
 *
 * Implements client-side checkout form validation with React Hook Form and Zod.
 * Connects directly to the Zustand cart store to ensure checkout is only enabled
 * when items exist in the cart.
 */
export function CheckoutSection() {
  const mounted = useMounted();
  const cartItems = useCartStore(selectCartItems);
  const totalItemCount = useCartStore(selectTotalItemCount);
  const [validatedData, setValidatedData] = useState<CheckoutFormData | null>(null);

  const isCartEmpty = mounted ? cartItems.length === 0 : true;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    // Demonstration of successful client-side validation only
    // Does NOT fake a backend/database order creation
    setValidatedData(data);
  };

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
                Validated using React Hook Form & Zod schema.
              </CardDescription>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Lock className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
              <span>SSL Secure</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-5 space-y-4">
          {/* Client-side validation preview notice */}
          {validatedData && (
            <div
              role="status"
              className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-700 dark:text-emerald-300 space-y-1.5"
            >
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>Client validation passed successfully!</span>
              </div>
              <p className="text-muted-foreground pl-6 text-[11px]">
                Valid order for <strong>{validatedData.fullName}</strong> ({validatedData.email},{" "}
                {validatedData.phone}) ready for Server Action submission.
              </p>
              <div className="pl-6 pt-1">
                <button
                  type="button"
                  onClick={() => setValidatedData(null)}
                  className="text-[11px] underline hover:text-emerald-900 dark:hover:text-emerald-100"
                >
                  Dismiss notice
                </button>
              </div>
            </div>
          )}

          {isCartEmpty && (
            <div
              role="alert"
              className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>Your shopping cart is currently empty. Add products before placing an order.</span>
            </div>
          )}

          <form
            id="checkout-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-xs font-medium">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Jane Doe"
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                {...register("fullName")}
              />
              {errors.fullName && (
                <p id="fullName-error" role="alert" className="text-xs text-destructive mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-medium">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane.doe@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email")}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="text-xs text-destructive mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs font-medium">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 012-3456"
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p id="phone-error" role="alert" className="text-xs text-destructive mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Street Address */}
            <div className="space-y-1.5">
              <Label htmlFor="address" className="text-xs font-medium">
                Street Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="address"
                type="text"
                placeholder="123 University Way, Apt 4B"
                autoComplete="street-address"
                aria-invalid={Boolean(errors.address)}
                aria-describedby={errors.address ? "address-error" : undefined}
                {...register("address")}
              />
              {errors.address && (
                <p id="address-error" role="alert" className="text-xs text-destructive mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* City & Postal Code Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="city" className="text-xs font-medium">
                  City <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="San Jose"
                  autoComplete="address-level2"
                  aria-invalid={Boolean(errors.city)}
                  aria-describedby={errors.city ? "city-error" : undefined}
                  {...register("city")}
                />
                {errors.city && (
                  <p id="city-error" role="alert" className="text-xs text-destructive mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="postalCode" className="text-xs font-medium">
                  Postal Code <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="postalCode"
                  type="text"
                  placeholder="95192"
                  autoComplete="postal-code"
                  aria-invalid={Boolean(errors.postalCode)}
                  aria-describedby={errors.postalCode ? "postalCode-error" : undefined}
                  {...register("postalCode")}
                />
                {errors.postalCode && (
                  <p id="postalCode-error" role="alert" className="text-xs text-destructive mt-1">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="pt-3 border-t border-border/60 bg-muted/20 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            Client-side schema validation active. Next step will wire the Next.js Server Action.
          </p>
          <Button
            type="submit"
            form="checkout-form"
            disabled={isCartEmpty || isSubmitting}
            className="w-full sm:w-auto font-medium text-xs px-5 h-9 cursor-pointer"
          >
            {isCartEmpty
              ? "Cart is Empty"
              : `Place Order (${mounted ? totalItemCount : 0} items)`}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
