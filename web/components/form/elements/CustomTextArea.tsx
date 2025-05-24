import { memo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import FormFieldWrapper from "@/components/form/FormFieldWrapper";

export interface CustomTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    showHint?: boolean;
    resize?: boolean;
}

const CustomTextArea = ({ resize = true, ...props }: CustomTextAreaProps) => {
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
