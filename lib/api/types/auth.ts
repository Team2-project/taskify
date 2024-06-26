import { instance } from "./axios";

export interface LoginData {
  email: string;
  password: string;
}

export interface ChangePasswordData {
  password: string;
  newPassword: string;
}

//로그인
export const login = async (data: LoginData): Promise<any> => {
  try {
    const response = await instance.post(`/auth/login`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Password change failed: ${(error as Error).message}`);
  }
};

//비밀번호 변경
export const changePassword = async (
  data: ChangePasswordData,
): Promise<any> => {
  try {
    const response = await instance.put(`/auth/password`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Password change failed: ${(error as Error).message}`);
  }
};

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
