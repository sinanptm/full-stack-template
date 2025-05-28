"use client"

import useGetProfile from "@/hooks/api/user/useGetProfile";
import { Skeleton } from "@/components/ui/skeleton"

const Profile = () => {
    const { data, isLoading, error } = useGetProfile()

    if (isLoading) {
        return (
            <div className="text-start space-y-2">
                <Skeleton className="h-6 w-48 rounded-md" />
                <Skeleton className="h-6 w-64 rounded-md" />
                <Skeleton className="h-6 w-32 rounded-md" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div>
                Failed to load profile.
                <span className="text-red-400 ml-2">{error?.message}</span>
            </div>
      );
  }

    return (
        <div className="text-start">
            <p>
                <strong>Name:</strong> {data.user.name}
            </p>
            <p>
                <strong>Email:</strong> {data.user.email}
            </p>
            <p>
                <strong>ID:</strong> {data.user._id}
            </p>
        </div>
    );
}

export default Profile;
