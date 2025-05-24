"use client";

import type React from "react";

import { Label } from "@radix-ui/react-label";
import { memo, useId, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input as InputComponent } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    showHind?: boolean;
}

const Input = ({ label, error, hint, required, className, showHind, type, ...props }: InputProps) => {
    const id = useId();
    const hasError = !!error;
    const isPassword = type === "password";
    const [showPassword, setShowPassword] = useState(false);

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className="space-y-1 [--ring:var(--color-indigo-300)] *:not-first:mt-2 in-[.dark]:[--ring:var(--color-indigo-900)]">
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

            <div className="relative">
                <InputComponent
                    id={id}
                    type={inputType}
                    className={cn(
                        hasError && "border-destructive focus-visible:ring-destructive",
                        isPassword && "pr-10",
                        className,
                    )}
                    aria-invalid={hasError}
                    aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
                    {...props}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOffIcon size={16} aria-hidden="true" /> : <EyeIcon size={16} aria-hidden="true" />}
                    </button>
                )}
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

export default memo(Input);
