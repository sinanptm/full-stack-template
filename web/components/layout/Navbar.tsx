"use client";

import { memo, useCallback, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import useAuthUser from "@/hooks/store/auth/useAuthUser";
import useAuthAdmin from "@/hooks/store/auth/useAuthAdmin";
import useLogoutUser from "@/hooks/api/user/auth/useLogout";
import useLogoutAdmin from "@/hooks/api/admin/auth/useLogout";

const Navbar = () => {
    const { isAuthenticated: isUserAuthenticated } = useAuthUser();
    const { isAuthenticated: isAdminAuthenticated } = useAuthAdmin();
    const { mutate: logoutUser } = useLogoutUser();
    const { mutate: logoutAdmin } = useLogoutAdmin();
    const pathname = usePathname();
    const isAdminArea = pathname?.startsWith("/admin");

    const handleLogout = useCallback(() => {
        if (isAdminArea && isAdminAuthenticated) {
            logoutAdmin();
        } else if (isUserAuthenticated) {
            logoutUser();
        }
    }, [isAdminArea, isAdminAuthenticated, isUserAuthenticated, logoutAdmin, logoutUser]);

    const renderAdminNavigation = useMemo(() => (
        <>
            <Link href="/" prefetch={false}>
                <Button variant="default" size="sm">
                    User Area
                </Button>
            </Link>
            {isAdminAuthenticated ? (
                <Button variant="outline" size="sm" onClick={handleLogout}>
                    Admin Logout
                </Button>
            ) : (
                <Link href="/admin/auth" prefetch={false}>
                    <Button variant="ghost" size="sm">
                        Admin Sign In
                    </Button>
                </Link>
            )}
        </>
    ), [isAdminAuthenticated, handleLogout]);

    const renderUserNavigation = useMemo(() => (
        <>
            <Link href={isAdminAuthenticated ? "/admin" : "/admin/auth"} prefetch={false}>
                <Button variant={isAdminAuthenticated ? "ghost" : "default"} size="sm">
                    {isAdminAuthenticated ? "Admin Area" : "Admin Sign In"}
                </Button>
            </Link>
            {isUserAuthenticated ? (
                <Button variant="outline" size="sm" onClick={handleLogout}>
                    User Logout
                </Button>
            ) : (
                <>
                    <Link href="/auth" prefetch={false}>
                        <Button variant="ghost" size="sm">
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/auth/signup" prefetch={false}>
                        <Button variant="default" size="sm">
                            Sign Up
                        </Button>
                    </Link>
                </>
            )}
        </>
    ), [isAdminAuthenticated, isUserAuthenticated, handleLogout]);

    return (
        <nav className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-full items-center justify-between px-4">
                <Link
                    href="/"
                    className="text-lg font-semibold transition-colors hover:text-primary"
                >
                    Your App
                </Link>
                <div className="flex items-center space-x-4">
                    {isAdminArea ? renderAdminNavigation : renderUserNavigation}
                </div>
            </div>
        </nav>
    );
};

export default memo(Navbar);