"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import useAuthAdmin from "@/hooks/store/auth/useAuthAdmin";

const NotFoundPage = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.includes("/admin");
  const { isAuthenticated } = useAuthAdmin();
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
        <Link href={isAdminPage ? (isAuthenticated ? "/admin" : "/admin/auth") : "/"}>
          <Button>Go Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
