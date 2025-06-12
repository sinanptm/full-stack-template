"use client";

import { useCallback, useState } from "react";
import useGetProfile from "@/hooks/api/user/useGetProfile";
import useUpdateProfile from "@/hooks/api/user/useUpdateProfile";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { PencilIcon } from "lucide-react";
import { Button } from "../ui/button";

const Profile = () => {
  const { data, isLoading, error, refetch } = useGetProfile();
  const { mutate, isPending } = useUpdateProfile();
  const [editName, setEditName] = useState("");
  const { name, email, profile } = data?.user || {};

  const handleEditClick = useCallback(() => {
    setEditName(name!);
  }, [name]);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  }, []);

  const handleNameSubmit = useCallback(() => {
    mutate(
      { name: editName },
      {
        onSuccess: () => {
          setEditName("");
          refetch();
        },
      },
    );
  }, [refetch, mutate, editName]);

  if (isLoading) {
    return (
      <div className="text-start space-y-2">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-6 w-48 rounded-md" />
        <Skeleton className="h-6 w-64 rounded-md" />
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
    <div className="text-start flex items-center space-x-4">
      {profile && (
        <Avatar>
          <AvatarImage src={profile} alt={name} />
          <AvatarFallback>{name?.[0] ?? "?"}</AvatarFallback>
        </Avatar>
      )}
      <div>
        <p className="flex space-x-1.5 items-center">
          <strong>Name:</strong>{" "}
          {editName ? (
            <span className="flex space-x-2 items-center">
              <Input value={editName} onChange={handleNameChange} className="w-48" />
              <Button variant="ghost" onClick={handleNameSubmit} disabled={isPending}>
                Save
              </Button>
              <Button variant="ghost" onClick={() => setEditName("")}>
                Cancel
              </Button>
            </span>
          ) : (
            <>
              {name}
              <Button variant="ghost" onClick={handleEditClick}>
                <PencilIcon aria-hidden className="h-4 w-4" />
              </Button>
            </>
          )}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>
    </div>
  );
};

export default Profile;
