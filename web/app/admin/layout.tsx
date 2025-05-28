'use client';

import useAuthAdmin from "@/hooks/store/auth/useAuthAdmin";
import { WrapperProps } from "@/types";
import { notFound, usePathname } from "next/navigation";

const AdminLayout = ({ children }: WrapperProps) => {
    const { isAuthenticated } = useAuthAdmin();
    const path = usePathname();
    if (!isAuthenticated && !path.includes('/admin/auth')) {
        notFound();
    } else {
        return children;
    }
};
export default AdminLayout;
