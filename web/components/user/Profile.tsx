"use client";

import useGetProfile from "@/hooks/api/user/useGetProfile";
import LoadingOverlay from "../LoadingOverlay";

const Profile = () => {
    const { data, isLoading, error } = useGetProfile();

    if (isLoading) return <LoadingOverlay loading />;
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
};

export default Profile;
