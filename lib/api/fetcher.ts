/*
공용 fetcher
*/
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { instance } from "./axios";

export const request = <T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const client = instance;
  return client(config);
};

const fetcher = async <T>(
  args: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await request<T>(args);
};

export default fetcher;
