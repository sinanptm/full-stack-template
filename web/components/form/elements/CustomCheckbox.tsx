import { memo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import FormFieldWrapper from "@/components/form/FormFieldWrapper";

export interface CustomCheckBoxProps {
    label?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    showHint?: boolean;
    description?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}

const CustomCheckbox = (props: CustomCheckBoxProps) => (
    <FormFieldWrapper {...props}>
        {(id, describedBy) => (
            <Checkbox
                id={id}
                checked={props.checked}
                defaultChecked={props.defaultChecked}
                onCheckedChange={props.onCheckedChange}
                disabled={props.disabled}
                className={cn(props.error && "border-destructive data-[state=checked]:bg-destructive cursor-pointer", props.className)}
                aria-invalid={!!props.error}
                aria-describedby={describedBy}
            />
        )}
    </FormFieldWrapper>
);

export default memo(CustomCheckbox);
