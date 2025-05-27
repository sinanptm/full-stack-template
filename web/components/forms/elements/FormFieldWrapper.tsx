"use client";

import { Label } from "@radix-ui/react-label";
import { memo, useId } from "react";
import { cn } from "@/lib/utils";
import { FormFieldWrapperProps } from "@/types";

const FormFieldWrapper = ({
  label,
  error,
  hint,
  required,
  showHint,
  description,
  disabled,
  className,
  children,
}: FormFieldWrapperProps) => {
  const id = useId();
  const hasError = !!error;

  const describedBy = error ? `${id}-error` : hint && showHint ? `${id}-hint` : undefined;

  return (
    <div
      className={cn(
        "space-y-2 [--ring:var(--color-indigo-300)] *:not-first:mt-2 in-[.dark]:[--ring:var(--color-indigo-900)]",
        className,
      )}
    >
      {label && (
        <Label
          htmlFor={id}
          className={cn(
            "text-sm font-medium leading-none",
            hasError && "text-destructive",
            required && "after:content-['*'] after:ml-0.5 after:text-destructive",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          {label}
        </Label>
      )}

      {description && (
        <p className={cn("text-xs text-muted-foreground", disabled && "opacity-50")}>{description}</p>
      )}

      {children(id, describedBy)}

      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive" role="alert" aria-live="polite">
          {error}
        </p>
      )}

      {hint && showHint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
};

export default memo(FormFieldWrapper);
