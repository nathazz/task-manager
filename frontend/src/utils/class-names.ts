import { twMerge } from "tailwind-merge";

type ClassName = string | false | null | undefined;

export function classNames(...classes: ClassName[]): string {
  return twMerge(classes.filter(Boolean).join(" "));
}
