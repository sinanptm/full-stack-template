'use client';

import { useState } from "react";
import useGetsUsersAdmin from "@/hooks/api/admin/useGetUsers";
import useUpdateUser from "@/hooks/api/admin/useUpdateUser";
import UsersTable from "@/components/admin/UserTable";
import { IUser } from "@/types";

interface EditingState {
    userId: string | null;
    name: string;
}

const Page = () => {
    const { data, isLoading, error, refetch } = useGetsUsersAdmin();
    const { mutate, isPending } = useUpdateUser();
    const [editing, setEditing] = useState<EditingState>({ userId: null, name: "" });

    const handleEditClick = (user: IUser) => {
        setEditing({ userId: user._id!, name: user.name! });
    };

    const handleInputChange = (field: 'name' | 'email', value: string) => {
        setEditing(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        if (!editing.userId) return;

        mutate(
            { _id: editing.userId, name: editing.name },
            {
                onSuccess: () => {
                    setEditing({ userId: null, name: "" });
                    refetch();
                }
            }
        );
    };

    const handleCancel = () => {
        setEditing({ userId: null, name: "" });
    };

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
            onToggleBlockStatus={() => { }}
        />
    );
};

export default Page;
