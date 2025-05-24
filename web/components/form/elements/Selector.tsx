"use client";

import { Label } from "@radix-ui/react-label";
import { memo, useId } from "react";
import { Select as SelectComponent, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface SelectProps {
    label?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    showHind?: boolean;
    options: { value: string; label: string; disabled?: boolean; }[];
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    className?: string;
}

const Select = ({
    label,
    error,
    hint,
    required,
    className,
    showHind,
    options,
    placeholder,
    value,
    defaultValue,
    onValueChange,
    disabled,
}: SelectProps) => {
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

            <SelectComponent value={value} defaultValue={defaultValue} onValueChange={onValueChange} disabled={disabled}>
                <SelectTrigger
                    className={cn(hasError && "border-destructive focus:ring-destructive", className)}
                    aria-invalid={hasError}
                    aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectComponent>

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

export default memo(Select);
