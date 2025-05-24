import { memo } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import FormFieldWrapper from "@/components/form/FormFieldWrapper";

export interface RadioOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
}

export interface CustomRadioGroupProps {
    label?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    showHint?: boolean;
    options: RadioOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    className?: string;
    orientation?: "horizontal" | "vertical";
    disabled?: boolean;
}

const CustomRadioGroup = memo(({ options, orientation = "vertical", ...props }: CustomRadioGroupProps) => (
    <FormFieldWrapper {...props}>
        {(id, describedBy) => (
            <RadioGroup
                value={props.value}
                defaultValue={props.defaultValue}
                onValueChange={props.onValueChange}
                disabled={props.disabled}
                className={cn(
                    "space-y-3",
                    orientation === "horizontal" && "flex space-x-6 space-y-0",
                    props.className
                )}
                aria-invalid={!!props.error}
                aria-describedby={describedBy}
            >
                {options.map((option) => (
                    <div key={option.value} className="flex items-start space-x-3">
                        <RadioGroupItem
                            value={option.value}
                            id={`${id}-${option.value}`}
                            disabled={option.disabled}
                            className={cn("cursor-pointer", props.error && "border-destructive")}
                        />
                        <div className="flex-1 space-y-1">
                            <label
                                htmlFor={`${id}-${option.value}`}
                                className={cn(
                                    "text-sm font-medium leading-none cursor-pointer",
                                    props.error && "text-destructive",
                                    (option.disabled || props.disabled) && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                {option.label}
                            </label>
                            {option.description && (
                                <p className="text-xs text-muted-foreground">
                                    {option.description}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </RadioGroup>
        )}
    </FormFieldWrapper>
));

export default memo(CustomRadioGroup);
