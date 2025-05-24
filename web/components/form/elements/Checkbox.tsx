"use client";

import { Label } from "@radix-ui/react-label";
import { memo, useId } from "react";
import { Checkbox as CheckBoxComponent } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export interface CheckboxProps {
    label?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    showHind?: boolean;
    description?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}

const Checkbox = ({
    label,
    error,
    hint,
    required,
    className,
    showHind,
    description,
    checked,
    defaultChecked,
    onCheckedChange,
    disabled,
}: CheckboxProps) => {
    const id = useId();
    const hasError = !!error;

    return (
        <div className="space-y-2 [--ring:var(--color-indigo-300)] *:not-first:mt-2 in-[.dark]:[--ring:var(--color-indigo-900)]">
            <div className="flex items-start space-x-3">
                <CheckBoxComponent
                    id={id}
                    checked={checked}
                    defaultChecked={defaultChecked}
                    onCheckedChange={onCheckedChange}
                    disabled={disabled}
                    className={cn(hasError && "border-destructive data-[state=checked]:bg-destructive", className)}
                    aria-invalid={hasError}
                    aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
                />

                <div className="flex-1 space-y-1">
                    {label && (
                        <Label
                            htmlFor={id}
                            className={cn(
                                "text-sm font-medium leading-none cursor-pointer",
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
                </div>
            </div>

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

export default memo(Checkbox);
