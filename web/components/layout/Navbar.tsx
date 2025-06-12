"use client";

import { memo, useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import useAuthUser from "@/hooks/store/auth/useAuthUser";
import useAuthAdmin from "@/hooks/store/auth/useAuthAdmin";
import useLogoutUser from "@/hooks/api/user/auth/useLogout";
import useLogoutAdmin from "@/hooks/api/admin/auth/useLogout";
import LogoutConfirmDialog from "@/components/dialogs/LogoutConfirmDialog";
import { APP_NAME } from "@/constants";
import { UserRole } from "@/types";

const Navbar = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { isAuthenticated: isUserAuthenticated } = useAuthUser();
  const { isAuthenticated: isAdminAuthenticated } = useAuthAdmin();
  const { mutate: logoutUser, isPending: isUserLogoutPending } = useLogoutUser();
  const { mutate: logoutAdmin, isPending: isAdminLogoutPending } = useLogoutAdmin();
  const pathname = usePathname();
  const isAdminArea = pathname?.startsWith("/admin");

  const handleLogoutClick = useCallback(() => {
    setShowLogoutDialog(true);
  }, []);

  const handleLogoutConfirm = useCallback(() => {
    if (isAdminArea && isAdminAuthenticated) {
      logoutAdmin();
    } else if (isUserAuthenticated) {
      logoutUser();
    }

    setShowLogoutDialog(false);
  }, [isAdminArea, isAdminAuthenticated, isUserAuthenticated, logoutAdmin, logoutUser]);

  const currentUserType = useMemo(() => {
    return isAdminArea && isAdminAuthenticated ? UserRole.Admin : UserRole.User;
  }, [isAdminArea, isAdminAuthenticated]);

  const isLogoutPending = useMemo(() => {
    return isUserLogoutPending || isAdminLogoutPending;
  }, [isUserLogoutPending, isAdminLogoutPending]);

  const renderAdminNavigation = useMemo(
    () => (
      <>
        <Link href="/" prefetch={false}>
          <Button variant="default" size="sm">
            User Area
          </Button>
        </Link>
        {isAdminAuthenticated ? (
          <Button variant="outline" size="sm" onClick={handleLogoutClick}>
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
    ),
    [isAdminAuthenticated, handleLogoutClick],
  );

  const renderUserNavigation = useMemo(
    () => (
      <>
        <Link href={isAdminAuthenticated ? "/admin" : "/admin/auth"} prefetch={false}>
          <Button variant={isAdminAuthenticated ? "ghost" : "default"} size="sm">
            {isAdminAuthenticated ? "Admin Area" : "Admin Sign In"}
          </Button>
        </Link>
        {isUserAuthenticated ? (
          <Button variant="outline" size="sm" onClick={handleLogoutClick}>
            User Logout
          </Button>
        ) : (
          <>
            <Link href="/auth" prefetch={false}>
              <Button variant="default" size="sm">
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
    ),
    [isAdminAuthenticated, isUserAuthenticated, handleLogoutClick],
  );

  return (
    <>
      <nav className="h-14 border-b  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          <Link href="/" className="text-lg font-semibold transition-colors hover:text-primary">
            {APP_NAME}
          </Link>
          <div className="flex items-center space-x-4">
            {isAdminArea ? renderAdminNavigation : renderUserNavigation}
          </div>
        </div>
      </nav>

      <LogoutConfirmDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogoutConfirm}
        userType={currentUserType}
        isLoading={isLogoutPending}
      />
    </>
  );
};

export default memo(Navbar);
