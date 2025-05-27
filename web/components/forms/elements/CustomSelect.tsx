import { memo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import FormFieldWrapper from "./FormFieldWrapper";
import { BaseFormFieldProps } from "@/types";

interface CustomSelectProps extends BaseFormFieldProps {
  options: { value: string; label: string; disabled?: boolean }[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const CustomSelect = ({ options, placeholder, ...props }: CustomSelectProps) => (
  <FormFieldWrapper {...props}>
    {(id, describedBy) => (
      <Select
        value={props.value}
        defaultValue={props.defaultValue}
        onValueChange={props.onValueChange}
        disabled={props.disabled}
      >
        <SelectTrigger
          className={cn(props.error && "border-destructive focus:ring-destructive", props.className)}
          aria-invalid={!!props.error}
          aria-describedby={describedBy}
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
      </Select>
    )}
  </FormFieldWrapper>
);
export default memo(CustomSelect);
