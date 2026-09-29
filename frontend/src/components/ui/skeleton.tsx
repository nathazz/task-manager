import { classNames } from "@/utils/class-names";

export function Skeleton({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={classNames(
        "block animate-pulse rounded bg-line motion-reduce:animate-none",
        className,
      )}
    />
  );
}
