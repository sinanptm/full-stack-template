import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PencilIcon } from "lucide-react";
import { IUser } from "@/types";
import { memo } from "react";

interface EditingState {
  userId: string | null;
  name: string;
}

interface UsersTableProps {
  users: IUser[] | undefined;
  isLoading: boolean;
  isPending: boolean;
  editing: EditingState;
  error?: Error | null;
  onEditClick: (user: IUser) => void;
  onInputChange: (field: "name", value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onToggleBlockStatus: (user: IUser) => void;
}

const UsersTable = ({
  users,
  isLoading,
  isPending,
  editing,
  error,
  onEditClick,
  onInputChange,
  onSave,
  onCancel,
  onToggleBlockStatus,
}: UsersTableProps) => {
  return (
    <div className="min-h-screen p-8">
      {error && <div className="text-red-600 mb-4">Failed to load users: {error.message}</div>}

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full divide-y">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs">NAME</th>
              <th className="px-6 py-3 text-left text-xs">EMAIL</th>
              <th className="px-6 py-3 text-left text-xs">BLOCKED</th>
              <th className="px-6 py-3 text-left text-xs">CREATED AT</th>
              <th className="px-6 py-3 text-left text-xs">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-48" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-12" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-16" />
                    </td>
                  </tr>
                ))
              : users?.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4">
                      {editing.userId === user._id ? (
                        <Input
                          value={editing.name}
                          onChange={(e) => onInputChange("name", e.target.value)}
                          className="w-48"
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.isBlocked ? "Yes" : "No"}</td>
                    <td className="px-6 py-4">{new Date(user.createdAt!).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      {editing.userId === user._id ? (
                        <div className="flex space-x-2">
                          <Button variant="ghost" onClick={onSave} disabled={isPending}>
                            Save
                          </Button>
                          <Button variant="ghost" onClick={onCancel} disabled={isPending}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <Button variant="ghost" onClick={() => onEditClick(user)}>
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => onToggleBlockStatus(user)}
                            disabled={isPending}
                          >
                            {user.isBlocked ? "Unblock" : "Block"}
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(UsersTable);
