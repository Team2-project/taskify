/* 공용 fetcher */

import { AxiosRequestConfig, AxiosResponse } from "axios";
import { instance } from "./axios";

export const request = async <T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  try {
    const response = await instance.request<T>(config);
    return response;
  } catch (error) {
    throw error;
  }
};

const fetcher = async <T>(args: AxiosRequestConfig): Promise<T> => {
  const response = await request<T>(args);
  return response.data;
};

export default fetcher;
