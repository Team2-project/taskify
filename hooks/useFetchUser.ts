/*
    User(사용자)에 대한 Data를 불러오는 hook
*/

import { useQuery } from "@tanstack/react-query";
import { User } from "@/lib/api/types/users";
import fetcher from "@/lib/api/fetcher";
import { AxiosRequestConfig } from "axios";

const useFetchUser = () => {
  const userConfig: AxiosRequestConfig = {
    url: "/users/me",
    method: "GET",
  };

  const { data, error, isLoading } = useQuery<User>({
    queryKey: ["userData"],
    queryFn: () => fetcher<User>(userConfig),
  });

  return { data, error, isLoading };
};

export default useFetchUser;
