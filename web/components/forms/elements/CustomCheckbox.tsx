import { memo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import FormFieldWrapper from "./FormFieldWrapper";
import { BaseFormFieldProps } from "@/types";

interface CustomCheckBoxProps extends BaseFormFieldProps {
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
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
        className={cn(
          props.error && "border-destructive data-[state=checked]:bg-destructive cursor-pointer",
          props.className,
        )}
        aria-invalid={!!props.error}
        aria-describedby={describedBy}
      />
    )}
  </FormFieldWrapper>
);

export default memo(CustomCheckbox);
