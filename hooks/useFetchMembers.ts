/*
    dashboard에 해당하는 구성원(members)를 불러오는 hook
*/

import { useQuery } from "@tanstack/react-query";
import fetcher from "@/lib/api/fetcher";
import { AxiosRequestConfig } from "axios";
import { MembersResponse } from "@/lib/api/types/members";

const useFetchMembers = (dashboardId: number) => {
  const membersConfig: AxiosRequestConfig = {
    url: `/members`,
    method: "GET",
    params: {
      dashboardId,
    },
  };

  const { data, error, isLoading } = useQuery<MembersResponse>({
    queryKey: ["members", dashboardId],
    queryFn: () => fetcher<MembersResponse>(membersConfig),
    enabled: !!dashboardId,
  });

  return { data, error, isLoading };
};

export default useFetchMembers;
