import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { classNames } from "@/utils/class-names";

const controlClass =
  "w-full  rounded-lg border border-line bg-white px-3 py-2 text-sm font-normal text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/25";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
      <span>{label}</span>
      {children}
    </label>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function TextField({ label, className, ...props }: TextFieldProps) {
  return (
    <Field label={label}>
      <input className={classNames(controlClass, className)} {...props} />
    </Field>
  );
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function TextAreaField({ label, className, ...props }: TextAreaFieldProps) {
  return (
    <Field label={label}>
      <textarea className={classNames(controlClass, "resize-y", className)} {...props} />
    </Field>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export function SelectField({ label, className, ...props }: SelectFieldProps) {
  return (
    <Field label={label}>
      <select className={classNames(controlClass, className)} {...props} />
    </Field>
  );
}
