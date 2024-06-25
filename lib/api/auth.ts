import { instance } from "./axios";

export const login = async (
  teamId: string,
  data: { username: string; password: string },
) => {
  const response = await instance.post(`/${teamId}/auth/login`, data);
  return response.data;
};

export const changePassword = async (
  teamId: string,
  data: { oldPassword: string; newPassword: string },
) => {
  const response = await instance.put(`/${teamId}/auth/password`, data);
  return response.data;
};
