import { GET } from "@/lib/api";
import { IUser } from "@/types";
import { GetRoutes } from "@/types/api/GetRoutes";
import { useQuery } from "@tanstack/react-query";

interface GetProfileResponse {
  user: IUser;
}

const useGetProfile = () => {
  return useQuery<GetProfileResponse>({
    queryFn: async () => {
      const res = await GET<GetProfileResponse>({ route: GetRoutes.GetProfile });
      return res;
    },
    queryKey: [GetRoutes.GetProfile],
  });
};

export default useGetProfile;
