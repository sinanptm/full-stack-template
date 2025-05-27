import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "button" | "reset";
  className?: string;
  // eslint-disable-next-line
  [key: string]: any;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading = false,
  disabled = false,
  children = "Submit",
  onClick,
  type = "submit",
  className,
  ...props
}) => {
  return (
    <Button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin " />}
      {children}
    </Button>
  );
};

export default memo(SubmitButton);
