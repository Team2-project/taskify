/*
Members: 대시보드 멤버 타입 정의
*/

// 요청 타입 정의
export interface MembersRequest {
  page?: number;
  size?: number;
  dashboardId: number;
}

// 응답 타입 정의
export interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

export interface MembersResponse {
  members: Member[];
  totalCount: number;
}
