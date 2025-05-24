"use client";

import type React from "react";

import { Label } from "@radix-ui/react-label";
import { memo, useId } from "react";
import { Textarea as TextAreaComponent } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    showHind?: boolean;
    resize?: boolean;
}

const TextArea = ({
    label,
    error,
    hint,
    required,
    className,
    showHind,
    resize = true,
    ...props
}: TextAreaProps) => {
    const id = useId();
    const hasError = !!error;

    return (
        <div className="space-y-2 [--ring:var(--color-indigo-300)] *:not-first:mt-2 in-[.dark]:[--ring:var(--color-indigo-900)]">
            {label && (
                <Label
                    htmlFor={id}
                    className={cn(
                        "text-sm font-medium leading-none",
                        hasError && "text-destructive",
                        required && "after:content-['*'] after:ml-0.5 after:text-destructive",
                    )}
                >
                    {label}
                </Label>
            )}

            <TextAreaComponent
                id={id}
                className={cn(
                    !resize && "resize-none",
                    hasError && "border-destructive focus-visible:ring-destructive",
                    className,
                )}
                aria-invalid={hasError}
                aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
                {...props}
            />

            {error && (
                <p id={`${id}-error`} className="text-xs text-destructive" role="alert" aria-live="polite">
                    {error}
                </p>
            )}

            {hint && showHind && !error && (
                <p id={`${id}-hint`} className="text-xs text-muted-foreground">
                    {hint}
                </p>
            )}
        </div>
    );
};

export default memo(TextArea);
