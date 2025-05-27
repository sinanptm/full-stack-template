import { Input } from "@/components/ui/input";
import FormFieldWrapper from "./FormFieldWrapper";
import { memo, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BaseFormFieldProps } from "@/types";

interface CustomInputProps extends BaseFormFieldProps, React.InputHTMLAttributes<HTMLInputElement> {}

const CustomInput = ({ type, ...props }: CustomInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line
  const { error, showHint, ...inputProps } = props;
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <FormFieldWrapper {...props}>
      {(id, describedBy) => (
        <div className="relative">
          <Input
            id={id}
            type={inputType}
            className={cn(
              props.error && "border-destructive focus-visible:ring-destructive",
              isPassword && "pr-10",
              props.className,
            )}
            aria-describedby={describedBy}
            aria-invalid={!!props.error}
            {...inputProps}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            </button>
          )}
        </div>
      )}
    </FormFieldWrapper>
  );
};

export default memo(CustomInput);
