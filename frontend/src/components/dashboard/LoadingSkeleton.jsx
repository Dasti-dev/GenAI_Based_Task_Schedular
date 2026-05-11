import { Skeleton } from "@/components/ui/skeleton";

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-28 w-full rounded-2xl bg-zinc-800" />
      <Skeleton className="h-28 w-full rounded-2xl bg-zinc-800" />
      <Skeleton className="h-28 w-full rounded-2xl bg-zinc-800" />
    </div>
  );
}

export default LoadingSkeleton;