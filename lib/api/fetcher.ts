/*
공용 fetcher
*/

import { AxiosRequestConfig, AxiosResponse } from "axios";
import { instance } from "./axios";

export const request = <T>(
  config: AxiosRequestConfig,
  onSuccess?: (value: AxiosResponse<T>) => void,
  onError?: (reason: any) => void,
) => {
  const client = instance;
  return client(config).then(onSuccess).catch(onError);
};

const fetcher = async (args: AxiosRequestConfig) => await request({ ...args });

export default fetcher;
