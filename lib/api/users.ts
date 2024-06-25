import { instance } from "./axios";

//회원가입
export const signUp = async (data: { username: string; password: string }) => {
  const response = await instance.post(`/users`, data);
  return response.data;
};

//내 정보 조회
export const fetchUserProfile = async () => {
  const response = await instance.get(`/users/me`);
  return response.data;
};

//내 정보 수정
export const updateUserProfile = async (data: {
  username?: string;
  password?: string;
}) => {
  const response = await instance.put(`/users/me`, data);
  return response.data;
};

//프로필 이미지 업로드
export const uploadProfileImage = async (data: FormData) => {
  const response = await instance.post(`/users/me/image`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
