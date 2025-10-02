import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card className="h-full flex flex-col overflow-hidden border-2">
      {/* Product Image Skeleton */}
      <Skeleton className="h-64 w-full rounded-none" />

      <CardHeader className="pb-3">
        <div className="space-y-2">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>

        {/* Tasting Notes */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-14" />
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 pt-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        {/* Prices */}
        <div className="flex items-center gap-4 w-full">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-20" />
        </div>

        {/* CTA Button */}
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
