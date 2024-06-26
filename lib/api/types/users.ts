import { instance } from "../axios";

// 회원가입 요청 바디 타입
export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
}

// 내 정보 조회 응답 타입
export interface FetchUserProfileResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// 내 정보 수정 요청 바디 타입
export interface UpdateUserProfileRequest {
  nickname?: string;
  profileImageUrl?: string;
}

// 내 정보 수정 응답 타입
export interface UpdateUserProfileResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

//회원가입
export const signUp = async (data: SignUpRequest): Promise<void> => {
  await instance.post(`/users`, data);
};

//내 정보 조회
export const fetchUserProfile = async (): Promise<FetchUserProfileResponse> => {
  const response = await instance.get<FetchUserProfileResponse>(`/users/me`);
  return response.data;
};

//내 정보 수정
export const updateUserProfile = async (
  data: UpdateUserProfileRequest,
): Promise<UpdateUserProfileResponse> => {
  const response = await instance.put<UpdateUserProfileResponse>(
    `/users/me`,
    data,
  );
  return response.data;
};

//프로필 이미지 업로드
export const uploadProfileImage = async (
  data: FormData,
): Promise<UpdateUserProfileResponse> => {
  const response = await instance.post<UpdateUserProfileResponse>(
    "/users/me/image",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};
