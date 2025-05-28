'use client';

import { Button } from "@/components/ui/button";
import useLogoutAdmin from "@/hooks/api/admin/auth/useLogout";
import useGetsUsersAdmin from "@/hooks/api/admin/useGetUsers";
import { IUser } from "@/types";

const Page = () => {
    const { mutate } = useLogoutAdmin();
    const { data, isLoading, error } = useGetsUsersAdmin();

    return (
        <div className="min-h-screen p-8 ">
            <div className="flex justify-end mb-4">
                <Button onClick={() => mutate()}>Logout</Button>
            </div>

            <h1 className="text-2xl font-semibold mb-4">Users</h1>

            {error && (
                <div className="text-red-600">Failed to load users: {error.message}</div>
            )}

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="overflow-x-auto rounded shadow">
                    <table className="min-w-full divide-y ">
                        <thead >
                            <tr>
                                <th className="px-6 py-3 text-left text-xs">NAME</th>
                                <th className="px-6 py-3 text-left text-xs">EMAIL</th>
                                <th className="px-6 py-3 text-left text-xs">BLOCKED</th>
                                <th className="px-6 py-3 text-left text-xs">CREATED AT</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                                {data?.users?.map((user: IUser) => (
                                <tr key={user._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {user.isBlocked ? "Yes" : "No"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(user.createdAt!).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Page;
