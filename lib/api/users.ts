import { instance } from "./axios";

export const signUp = async (
  teamId: string,
  data: { username: string; password: string },
) => {
  const response = await instance.post(`/${teamId}/users`, data);
  return response.data;
};

export const fetchUserProfile = async (teamId: string) => {
  const response = await instance.get(`/${teamId}/users/me`);
  return response.data;
};

export const updateUserProfile = async (
  teamId: string,
  data: { username?: string; password?: string },
) => {
  const response = await instance.put(`/${teamId}/users/me`, data);
  return response.data;
};

export const uploadProfileImage = async (teamId: string, data: FormData) => {
  const response = await instance.post(`/${teamId}/users/me/image`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
