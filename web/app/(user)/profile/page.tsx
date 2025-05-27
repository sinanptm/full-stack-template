"use client";

import useGetProfile from "@/hooks/api/user/useGetProfile";

const Page = () => {
  const { data, isLoading, error } = useGetProfile();

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        Failed to load profile.
        <span className="text-red-400 ml-2">{error.message}</span>
      </div>
    );
  if (isLoading || !data) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex items-center justify-center h-screen font-sans text-base">
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
    </div>
  );
};

export default Page;
