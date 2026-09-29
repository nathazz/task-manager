import type { ButtonHTMLAttributes } from "react";
import { classNames } from "@/utils/class-names";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-strong",
  secondary: "border border-line bg-white text-ink hover:bg-column",
  ghost: "text-muted hover:bg-column hover:text-ink",
  danger: "text-danger hover:bg-danger-soft",
};

const sizes: Record<Size, string> = {
  sm: "px-2 py-1 text-xs font-medium",
  md: "px-3.5 py-2 text-sm font-semibold",
  lg: "px-5 py-2.5 text-[15px] font-semibold",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "secondary",
  size = "md",
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames(
        "rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
