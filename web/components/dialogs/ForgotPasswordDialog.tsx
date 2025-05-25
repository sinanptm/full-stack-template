"use client";

import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/forms/elements/CustomInput";
import SubmitButton from "../forms/elements/SubmitButton";
import { ForgotPasswordData, ForgotPasswordDialogProps } from "@/types";
import { forgotPasswordSchema } from "@/lib/schema";

const ForgotPasswordDialog = ({
    open,
    onOpenChange,
    onSubmit,
    isLoading = false,
    title = "Reset your password",
    description = "Enter your email address and we'll send you further instructions to reset your password.",
    submitButtonText = "Send reset link",
    cancelButtonText = "Cancel",
    emailLabel = "Email",
    emailPlaceholder = "Enter your email address",
    className = "",
}: ForgotPasswordDialogProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ForgotPasswordData>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onBlur",
    });

    const handleFormSubmit = async (data: ForgotPasswordData) => {
        try {
            await onSubmit(data);
            reset();
        } catch (error) {
            console.error("Forgot password submission error:", error);
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            reset();
        }
        onOpenChange(newOpen);
    };

    const handleCancel = () => {
        reset();
        onOpenChange(false);
    };

    const isFormLoading = isLoading || isSubmitting;

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className={`w-full max-w-md mx-auto p-0 ${className}`}>
                <DialogHeader className="px-6 pt-6 pb-2">
                    <DialogTitle className="text-xl font-semibold text-center">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground text-center mt-2 leading-relaxed">
                        {description}
                    </DialogDescription>
                </DialogHeader>

                <div className="px-6 pb-6">
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <CustomInput
                                label={emailLabel}
                                type="email"
                                placeholder={emailPlaceholder}
                                error={errors.email?.message}
                                className="w-full"
                                {...register("email")}
                            />
                        </div>

                        <div className="flex flex-col gap-3 pt-2">
                            <SubmitButton
                                isLoading={isFormLoading}
                                className="w-full h-11 font-medium "
                                disabled={isFormLoading}
                            >
                                {submitButtonText}
                            </SubmitButton>

                            <Button
                                type="button"
                                variant="ghost"
                                onClick={handleCancel}
                                disabled={isFormLoading}
                                className="w-full h-11 font-medium hover:bg-muted/50 cursor-pointer"
                            >
                                {cancelButtonText}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default memo(ForgotPasswordDialog);