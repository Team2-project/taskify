import { useEffect } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import fetcher from "@/lib/api/fetcher";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { atom, useAtom } from "jotai";

// 공용 데이터 Atom
export const apiDataAtom = atom<any>(null);

// API 요청 함수
const fetchAPI = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await fetcher<T>(config);
  return response.data;
};

// 공용 훅
export const useAPI = <T>(
  key: string | null,
  config: AxiosRequestConfig | null,
): UseQueryResult<T> => {
  const [, setApiData] = useAtom(apiDataAtom);
  const queryKey = [key, config];

  const queryResult = useQuery<T>({
    queryKey: queryKey,
    queryFn: () =>
      config ? fetchAPI<T>(config) : Promise.reject("No config provided"),
  });

  useEffect(() => {
    if (queryResult.data) {
      setApiData(queryResult.data);
    }
  }, [queryResult.data, setApiData]);

  return queryResult;
};
