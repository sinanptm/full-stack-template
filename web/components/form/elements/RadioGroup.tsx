"use client";

import { Label } from "@radix-ui/react-label";
import { memo, useId } from "react";
import { RadioGroup as RadioGroupComponent, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export interface RadioOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
}

export interface RadioGroupProps {
    label?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    showHind?: boolean;
    options: RadioOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    className?: string;
    orientation?: "horizontal" | "vertical";
    disabled?: boolean;
}

const RadioGroup = ({
    label,
    error,
    hint,
    required,
    className,
    showHind,
    options,
    value,
    defaultValue,
    onValueChange,
    orientation = "vertical",
    disabled,
}: RadioGroupProps) => {
    const groupId = useId();
    const hasError = !!error;

    return (
        <div className="space-y-2 [--ring:var(--color-indigo-300)] *:not-first:mt-2 in-[.dark]:[--ring:var(--color-indigo-900)]">
            {label && (
                <Label
                    className={cn(
                        "text-sm font-medium leading-none",
                        hasError && "text-destructive",
                        required && "after:content-['*'] after:ml-0.5 after:text-destructive",
                    )}
                >
                    {label}
                </Label>
            )}

            <RadioGroupComponent
                value={value}
                defaultValue={defaultValue}
                onValueChange={onValueChange}
                disabled={disabled}
                className={cn("space-y-3", orientation === "horizontal" && "flex space-x-6 space-y-0", className)}
                aria-invalid={hasError}
                aria-describedby={error ? `${groupId}-error` : hint ? `${groupId}-hint` : undefined}
            >
                {options.map((option) => {
                    const optionId = `${groupId}-${option.value}`;
                    return (
                        <div key={option.value} className="flex items-start space-x-3">
                            <RadioGroupItem
                                value={option.value}
                                id={optionId}
                                disabled={option.disabled}
                                className={cn(hasError && "border-destructive")}
                            />

                            <div className="flex-1 space-y-1">
                                <Label
                                    htmlFor={optionId}
                                    className={cn(
                                        "text-sm font-medium leading-none cursor-pointer",
                                        hasError && "text-destructive",
                                        (option.disabled || disabled) && "opacity-50 cursor-not-allowed",
                                    )}
                                >
                                    {option.label}
                                </Label>
                                {option.description && (
                                    <p className={cn("text-xs text-muted-foreground", (option.disabled || disabled) && "opacity-50")}>
                                        {option.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </RadioGroupComponent>

            {error && (
                <p id={`${groupId}-error`} className="text-xs text-destructive" role="alert" aria-live="polite">
                    {error}
                </p>
            )}

            {hint && showHind && !error && (
                <p id={`${groupId}-hint`} className="text-xs text-muted-foreground">
                    {hint}
                </p>
            )}
        </div>
    );
};

export default memo(RadioGroup);
