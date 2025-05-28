"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const NotFoundPage = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.includes("/admin");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center gap-4">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg text-gray-500">The page you&apos;re looking for doesn&apos;t exist.</p>
      {isAdminPage && (
        <Link href="/admin/auth">
          <Button>Signin</Button>
        </Link>
      )}
      <Link href={isAdminPage ? "/admin/auth" : "/"}>
        <Button>Go Back to Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
