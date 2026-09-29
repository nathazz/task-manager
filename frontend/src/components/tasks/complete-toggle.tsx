import { classNames } from "@/utils/class-names";

interface CompleteToggleProps {
  checked: boolean;
  title: string;
  disabled: boolean;
  onToggle: () => void;
}

export function CompleteToggle({
  checked,
  title,
  disabled,
  onToggle,
}: CompleteToggleProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={checked ? `Reopen "${title}"` : `Complete "${title}"`}
      disabled={disabled}
      onClick={onToggle}
      className={classNames(
        "relative mt-0.5 size-4 shrink-0 rounded-full border-2 transition-colors",
        checked
          ? "border-done bg-done"
          : "border-muted/50 hover:border-done disabled:hover:border-muted/50",
      )}
    >
      {checked && (
        <span className="absolute left-0.75 top-px h-2 w-1 rotate-45 border-b-2 border-r-2 border-white" />
      )}
    </button>
  );
}
