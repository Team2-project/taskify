/* 공용 fetcher */
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { instance } from "./axios";

// 로컬 스토리지에서 토큰을 가져오는 함수
const getToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

// API 요청 설정 객체 생성 함수
const createRequestConfig = (
  config: AxiosRequestConfig,
): AxiosRequestConfig => {
  const token = getToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
};

// Axios의 request 함수를 감싸는 함수
export const request = async <T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  try {
    const response = await instance.request<T>(createRequestConfig(config));
    return response;
  } catch (error) {
    throw error;
  }
};

// 데이터를 가져오는 fetcher 함수
const fetcher = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await request<T>(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetcher;
