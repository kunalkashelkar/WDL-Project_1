import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CartSummarySkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading order summary">
      <div className="space-y-1">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-3 w-56" />
      </div>

      <Card className="border-border shadow-xs">
        <CardHeader className="pb-3 border-b border-border/60">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-12" />
          </div>
        </CardHeader>

        <CardContent className="pt-4 space-y-4">
          {[1, 2].map((idx) => (
            <div key={idx} className="space-y-2 py-2">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-4 w-14" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-7 w-24 rounded-md" />
                <Skeleton className="h-7 w-7 rounded-md" />
              </div>
            </div>
          ))}
        </CardContent>

        <div className="p-4 border-t border-border/60 bg-muted/10 space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </Card>
    </div>
  );
}
