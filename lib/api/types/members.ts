import { instance } from "../axios";

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

export interface FetchMembersResponse {
  members: Member[];
  totalCount: number;
}

//대시보드 멤버 목록 조회
export const fetchMembers = async (
  dashboardId: number,
  page: number = 1,
  size: number = 20,
): Promise<FetchMembersResponse> => {
  const response = await instance.get<FetchMembersResponse>(
    `/${dashboardId}/members`,
    {
      params: {
        page,
        size,
      },
    },
  );
  return response.data;
};

//대시보드 멤버 삭제
export const deleteMember = async (
  dashboardId: number,
  memberId: number,
): Promise<void> => {
  await instance.delete(`/${dashboardId}/members/${memberId}`);
};
