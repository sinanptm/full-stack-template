'use client';

import LoadingOverlay from "@/components/LoadingOverlay";
import useAuthAdmin from "@/hooks/store/auth/useAuthAdmin";
import useHydrated from "@/hooks/useHydrated";
import { WrapperProps } from "@/types";
import { notFound, usePathname } from "next/navigation";

const AdminLayout = ({ children }: WrapperProps) => {
    const { isAuthenticated } = useAuthAdmin();
    const isHydrated = useHydrated();
    const path = usePathname();


    if (!isHydrated) {
        return <LoadingOverlay loading />;
    }

    if (!isAuthenticated && !path.includes('/admin/auth')) {
        notFound();
    }
    return children;
};

export default AdminLayout;