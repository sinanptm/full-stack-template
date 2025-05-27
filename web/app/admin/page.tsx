'use client';
import { Button } from "@/components/ui/button";
import useLogoutAdmin from "@/hooks/api/admin/auth/useLogout";

const page = () => {
    const { mutate } = useLogoutAdmin();
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Button onClick={() => mutate()}>
                Logout
            </Button>
        </div>
    );
};
export default page;
