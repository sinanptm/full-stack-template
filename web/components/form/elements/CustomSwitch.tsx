import { memo } from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import FormFieldWrapper from "@/components/form/FormFieldWrapper";

export interface CustomSwitchProps {
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

const CustomSwitch = (props: CustomSwitchProps) => (
    <FormFieldWrapper {...props}>
        {(id, describedBy) => (
            <div className="flex items-start space-x-3">
                <Switch
                    id={id}
                    checked={props.checked}
                    defaultChecked={props.defaultChecked}
                    onCheckedChange={props.onCheckedChange}
                    disabled={props.disabled}
                    className={cn("cursor-pointer", props.error && "data-[state=unchecked]:bg-destructive/20", props.className)}
                    aria-invalid={!!props.error}
                    aria-describedby={describedBy}
                />
            </div>
        )}
    </FormFieldWrapper>
);

export default memo(CustomSwitch);
