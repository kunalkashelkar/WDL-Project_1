"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutFormData } from "@/lib/validations/checkout";
import { processCheckout, type CheckoutActionResult } from "@/actions/checkout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Lock, CheckCircle2, AlertCircle, Loader2, ArrowRight, RotateCcw } from "lucide-react";
import { useCartStore, selectCartItems, selectTotalItemCount, selectClearCart } from "@/store/useCartStore";
import { useMounted } from "@/hooks/useMounted";

import { toast } from "sonner";

export function CheckoutSection() {
  const mounted = useMounted();
  const cartItems = useCartStore(selectCartItems);
  const totalItemCount = useCartStore(selectTotalItemCount);
  const clearCart = useCartStore(selectClearCart);

  const [isPending, startTransition] = useTransition();
  const [serverResult, setServerResult] = useState<CheckoutActionResult | null>(null);

  const isCartEmpty = mounted ? cartItems.length === 0 : true;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
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

  const onSubmit = (formData: CheckoutFormData) => {
    // Prevent duplicate submissions if already pending
    if (isPending) return;

    // Clear any previous server feedback
    setServerResult(null);

    // Dispatch Server Action using React's useTransition
    startTransition(async () => {
      try {
        const payloadItems = cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        }));

        const result = await processCheckout(formData, payloadItems);
        setServerResult(result);

        if (result.success) {
          // Success feedback: Trigger accessible toast & reset store
          toast.success("Order Placed Successfully!", {
            description: `Reference: ${result.referenceNumber} — A receipt has been sent to ${result.customerSummary?.email}.`,
          });
          clearCart();
          reset();
        } else {
          // Validation / Controlled business failure: Toast alert & map errors
          toast.error("Checkout Failed", {
            description: result.error || "Please review your inputs and try again.",
          });

          if (result.fieldErrors) {
            Object.entries(result.fieldErrors).forEach(([field, message]) => {
              if (message) {
                setError(field as keyof CheckoutFormData, {
                  type: "server",
                  message,
                });
              }
            });
          }
        }
      } catch (err) {
        // Unexpected server-side failure: sanitized user-friendly error without leaking sensitive details
        console.error("Unexpected checkout error:", err);
        const genericMessage = "An unexpected error occurred while processing your order. Please try again later.";
        setServerResult({
          success: false,
          error: genericMessage,
        });
        toast.error("Order Processing Error", {
          description: genericMessage,
        });
      }
    });
  };

  const handleStartNewOrder = () => {
    setServerResult(null);
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

      <Card className="border-border/80 bg-card/90 shadow-2xs backdrop-blur-xs">
        <CardHeader className="pb-3 border-b border-border/60 bg-muted/20">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>Customer Information</span>
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-0.5">
                Validated client-side and verified by Next.js Server Action.
              </CardDescription>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded-md border border-border/50">
              <Lock className="h-3 w-3 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span className="font-medium">SSL 256-bit</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-5 space-y-4">
          {/* Server Confirmation State */}
          {serverResult?.success && (
            <div
              role="status"
              className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-800 dark:text-emerald-200 space-y-3"
            >
              <div className="flex items-center gap-2 font-semibold text-sm text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>Order Placed Successfully!</span>
              </div>

              <div className="rounded-md bg-background/80 p-3 space-y-1.5 border border-border text-foreground">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-semibold">{serverResult.orderId}</span>
                </div>
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-muted-foreground">Reference:</span>
                  <span className="font-semibold">{serverResult.referenceNumber}</span>
                </div>
                <Separator className="my-1" />
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Recipient:</span>
                  <span className="font-medium">{serverResult.customerSummary?.name}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Confirmation Email:</span>
                  <span className="font-medium">{serverResult.customerSummary?.email}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Total Charged:</span>
                  <span className="font-bold">${serverResult.totalAmount?.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <p className="text-[11px] text-muted-foreground">
                  The cart has been reset. You can now start another order.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={handleStartNewOrder}
                  className="gap-1 text-xs"
                >
                  <RotateCcw className="h-3 w-3" />
                  New Order
                </Button>
              </div>
            </div>
          )}

          {/* Server Error Alert */}
          {serverResult && !serverResult.success && serverResult.error && (
            <div
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive flex items-start gap-2"
            >
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Server Action Error</p>
                <p className="mt-0.5">{serverResult.error}</p>
              </div>
            </div>
          )}

          {/* Empty cart warning */}
          {!serverResult?.success && isCartEmpty && (
            <div
              role="alert"
              className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>Your shopping cart is currently empty. Add products before placing an order.</span>
            </div>
          )}

          {/* Checkout Form */}
          {!serverResult?.success && (
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
                  disabled={isPending}
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
                    disabled={isPending}
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
                    disabled={isPending}
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
                  disabled={isPending}
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
                    disabled={isPending}
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
                    disabled={isPending}
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
          )}
        </CardContent>

        {!serverResult?.success && (
          <CardFooter className="pt-3 border-t border-border/60 bg-muted/20 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              Submissions are validated server-side by Next.js Server Action.
            </p>
            <Button
              type="submit"
              form="checkout-form"
              size="lg"
              disabled={isCartEmpty || isPending}
              className="w-full sm:w-auto font-semibold text-xs sm:text-sm px-6 cursor-pointer gap-2 shadow-sm hover:shadow-md"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Processing Order...</span>
                </>
              ) : isCartEmpty ? (
                "Cart is Empty"
              ) : (
                <>
                  <span>Place Order ({mounted ? totalItemCount : 0} items)</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </section>
  );
}
