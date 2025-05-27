"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { memo, useEffect } from "react";
import useIsLoading from "@/hooks/store/useLoading";

const LoadingOverlay = ({ className }: { className?: string; }) => {
    const isLoading = useIsLoading((state) => state.isLoading);

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isLoading]);

    if (!isLoading) return null;

    return (
        <div
            className={cn(
                "fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm",
                className,
            )}
            aria-disabled={true}
            aria-hidden={true}
            aria-busy={true}
            aria-live="polite"
            aria-label="Loading..."
        >
            <Loader2 className="h-10 w-10 animate-spin text-white" />
        </div>
    );
};

export default memo(LoadingOverlay); 