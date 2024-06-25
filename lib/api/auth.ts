import { instance } from "./axios";

//로그인
export const login = async (data: { username: string; password: string }) => {
  const response = await instance.post(`/auth/login`, data);
  return response.data;
};

//비밀번호 변경
export const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  const response = await instance.put(`/auth/password`, data);
  return response.data;
};
