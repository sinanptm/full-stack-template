"use client";

import { useState, useCallback } from "react";
import useGetsUsersAdmin from "@/hooks/api/admin/useGetUsers";
import useUpdateUser from "@/hooks/api/admin/useUpdateUser";
import UsersTable from "@/components/admin/UserTable";
import { IUser } from "@/types";
import useToggleBlock from "@/hooks/api/admin/useToggleBlock";

interface EditingState {
  userId: string | null;
  name: string;
}

const Page = () => {
  const { data, isLoading, error, refetch } = useGetsUsersAdmin();
  const { mutate, isPending } = useUpdateUser();
  const [editing, setEditing] = useState<EditingState>({ userId: null, name: "" });
  const { mutate: toggleBlock } = useToggleBlock();

  const handleEditClick = useCallback((user: IUser) => {
    setEditing({ userId: user._id!, name: user.name! });
  }, []);

  const handleInputChange = useCallback((field: "name", value: string) => {
    setEditing((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(() => {
    if (!editing.userId) return;

    mutate(
      { _id: editing.userId, name: editing.name },
      {
        onSuccess: () => {
          setEditing({ userId: null, name: "" });
          refetch();
        },
      },
    );
  }, [editing, mutate, refetch]);

  const handleCancel = useCallback(() => {
    setEditing({ userId: null, name: "" });
  }, []);

  const toggleBlockStatus = useCallback(
    (user: IUser) => {
      toggleBlock(user._id!, {
        onSuccess: () => {
          refetch();
        },
      });
    },
    [toggleBlock, refetch],
  );

  return (
    <UsersTable
      users={data?.users}
      isLoading={isLoading}
      isPending={isPending}
      editing={editing}
      error={error}
      onEditClick={handleEditClick}
      onInputChange={handleInputChange}
      onSave={handleSave}
      onCancel={handleCancel}
      onToggleBlockStatus={toggleBlockStatus}
    />
  );
};

export default Page;
