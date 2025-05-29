'use client';

import useGetsUsersAdmin from "@/hooks/api/admin/useGetUsers";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
    const { data, isLoading, error } = useGetsUsersAdmin();

    return (
        <div className="min-h-screen p-8">
            {error && (
                <div className="text-red-600 mb-4">
                    Failed to load users: {error.message}
                </div>
            )}

            <div className="overflow-x-auto rounded shadow">
                <table className="min-w-full divide-y">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs">NAME</th>
                            <th className="px-6 py-3 text-left text-xs">EMAIL</th>
                            <th className="px-6 py-3 text-left text-xs">BLOCKED</th>
                            <th className="px-6 py-3 text-left text-xs">CREATED AT</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Skeleton className="h-4 w-24" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Skeleton className="h-4 w-48" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Skeleton className="h-4 w-12" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Skeleton className="h-4 w-20" />
                                    </td>
                                </tr>
                            ))
                        ) : (data?.users?.map((user) => (
                            <tr key={user._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.isBlocked ? 'Yes' : 'No'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(user.createdAt!).toLocaleDateString()}
                                </td>
                            </tr>
                        )))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page;