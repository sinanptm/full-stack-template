"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import useAuthAdmin from "@/hooks/store/auth/useAuthAdmin";

const NotFoundPage = () => {
  const pathname = usePathname();
  const { isAuthenticated, isHydrated } = useAuthAdmin();
  const isAdminPage = pathname.includes("/admin");

  if (!isHydrated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center gap-4">
        <Skeleton className="h-10 w-48 rounded-md" />
        <Skeleton className="h-6 w-64 rounded-md" />
        <div className="space-x-3.5">
          <Skeleton className="h-10 w-32 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center gap-4">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg text-gray-500">The page you&apos;re looking for doesn&apos;t exist.</p>
      <div className="space-x-3.5">
        {isAdminPage && !isAuthenticated && (
          <Link href="/admin/auth">
            <Button>Signin as admin</Button>
          </Link>
        )}
        <Link href={isAdminPage ? (isAuthenticated ? "/admin" : "/") : "/"}>
          <Button>Go Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
