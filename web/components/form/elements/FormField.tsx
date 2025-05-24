"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FormFieldProps {
    name: string;
    label?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    showHint?: boolean;
    children: ReactNode;
    className?: string;
}

const FormField = ({
    name,
    label,
    error,
    hint,
    required,
    showHint = true,
    children,
    className,
}: FormFieldProps) => {
    const { formState: { errors } } = useFormContext();
    const fieldError = errors[name]?.message as string;
    const hasError = !!error || !!fieldError;

    return (
        <div className={cn("space-y-2 [--ring:var(--color-indigo-300)] *:not-first:mt-2 in-[.dark]:[--ring:var(--color-indigo-900)]", className)}>
            {label && (
                <Label
                    htmlFor={name}
                    className={cn(
                        "text-sm font-medium leading-none",
                        hasError && "text-destructive",
                        required && "after:content-['*'] after:ml-0.5 after:text-destructive",
                    )}
                >
                    {label}
                </Label>
            )}

            {children}

            {(error || fieldError) && (
                <p className="text-xs text-destructive" role="alert" aria-live="polite">
                    {error || fieldError}
                </p>
            )}

            {hint && showHint && !hasError && (
                <p className="text-xs text-muted-foreground">
                    {hint}
                </p>
            )}
        </div>
    );
};

export default FormField;