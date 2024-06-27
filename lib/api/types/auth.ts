/*
auth: 로그인 + 비밀번호 변경 타입 정의
*/

// 로그인 요청 타입 정의
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답 타입 정의
export interface LoginResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

// 비밀번호 변경 요청 타입 정의
export interface ChangePasswordRequest {
  password: string;
  newPassword: string;
}
