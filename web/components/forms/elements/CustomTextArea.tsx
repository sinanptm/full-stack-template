import { memo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import FormFieldWrapper from "./FormFieldWrapper";
import { BaseFormFieldProps } from "@/types";

interface CustomTextAreaProps extends BaseFormFieldProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  resize?: boolean;
}

const CustomTextArea = ({ resize = true, ...props }: CustomTextAreaProps) => {
  // eslint-disable-next-line
  const { error, showHint, ...textAreaProps } = props;
  return (
    <FormFieldWrapper {...props}>
      {(id, describedBy) => (
        <Textarea
          id={id}
          className={cn(!resize && "resize-none", props.error && "border-destructive", props.className)}
          aria-describedby={describedBy}
          aria-invalid={!!props.error}
          {...textAreaProps}
        />
      )}
    </FormFieldWrapper>
  );
};

export default memo(CustomTextArea);
