import { Skeleton } from "@/components/ui/skeleton";

export function TaskCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-line bg-white p-3">
      <Skeleton className="h-3.5 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}
