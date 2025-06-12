import { GET } from "@/lib/api";
import { IUser, UserRole } from "@/types";
import { GetRoutes } from "@/types/api/GetRoutes";
import { useQuery } from "@tanstack/react-query";

interface GetUsersResponse {
  users: IUser[];
}

const useGetsUsersAdmin = () => {
  return useQuery<GetUsersResponse>({
    queryFn: async () => {
      const res = await GET<GetUsersResponse>({ route: GetRoutes.GetUsersAdmin, role: UserRole.Admin });
      return res;
    },
    queryKey: [GetRoutes.GetUsersAdmin],
  });
};

export default useGetsUsersAdmin;
