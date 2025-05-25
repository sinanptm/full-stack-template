import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
    isLoading?: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "submit" | "button" | "reset";
    className?: string;
    [key: string]: any;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
    isLoading = false,
    disabled = false,
    children = "Submit",
    onClick,
    type = "submit",
    ...props
}) => {
    return (
        <Button
            type={type}
            disabled={disabled || isLoading}
            onClick={onClick}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </Button>
    );
};

export default memo(SubmitButton);