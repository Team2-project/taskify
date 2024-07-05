import { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { instance } from "./axios";

// 쿠키에서 "accessToken"이라는 키를 사용하여 저장된 토큰을 가져오는 함수
const getToken = (): string | undefined => {
  return Cookies.get("accessToken");
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

// Axios의 request 함수를 감싸는 함수 (인증 기반 요청)
export const authRequest = async <T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  try {
    const response = await instance.request<T>(createRequestConfig(config));
    return response;
  } catch (error) {
    throw error;
  }
};

// Axios의 request 함수를 감싸는 함수 (인증 기반 요청 X)
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

// 데이터를 가져오는 fetcher 함수
const fetcher = async <T>(
  config: AxiosRequestConfig,
  isAuth: boolean = true,
): Promise<T> => {
  try {
    const response = isAuth
      ? await authRequest<T>(config)
      : await request<T>(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetcher;
