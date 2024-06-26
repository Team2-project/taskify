import { instance } from "../axios";

//대시보드 생성 타입
export interface CreateDashboardData {
  title: string;
  color: string;
}

//대시보드 목록 조회 응답 타입
export interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export interface FetchDashboardsResponse {
  cursorId: number;
  totalCount: number;
  dashboards: Dashboard[];
}

//대시보드 상세 조회 응답 타입
export interface FetchDashboardDetailsResponse {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}
//대시보드 수정 request body 타입
export interface UpdateDashboardData {
  title: string;
  color: string;
}

// 초대 정보 타입
export interface Inviter {
  nickname: string;
  email: string;
  id: number;
}

export interface Invitee {
  nickname: string;
  email: string;
  id: number;
}

export interface Invitation {
  id: number;
  inviter: Inviter;
  teamId: string;
  dashboard: Dashboard;
  invitee: Invitee;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetInvitationsResponse {
  totalCount: number;
  invitations: Invitation[];
}

//대시보드 생성
export const createDashboard = async (
  data: CreateDashboardData,
): Promise<Dashboard> => {
  const response = await instance.post("/dashboards", data);
  return response.data;
};

//대시보드 목록 조회
export const fetchDashboards = async (): Promise<FetchDashboardsResponse> => {
  const response = await instance.get<FetchDashboardsResponse>(`/dashboards`, {
    params: {
      navigationMethod: "pagination",
      page: 1,
      size: 100,
    },
  });

  return response.data;
};

//대시보드 상세 조회
export const fetchDashboardDetails = async (
  dashboardId: number,
): Promise<FetchDashboardDetailsResponse> => {
  const response = await instance.get<FetchDashboardDetailsResponse>(
    `/dashboards/${dashboardId}`,
  );
  return response.data;
};

//대시보드 수정
export const updateDashboard = async (
  dashboardId: number,
  data: UpdateDashboardData,
): Promise<Dashboard> => {
  const response = await instance.put(`/dashboards/${dashboardId}`, data);
  return response.data;
};

//대시보드 삭제
export const deleteDashboard = async (dashboardId: number): Promise<void> => {
  await instance.delete(`/dashboards/${dashboardId}`);
};

//대시보드 초대하기
export const inviteToDashboard = async (
  dashboardId: number,
  data: { email: string },
): Promise<void> => {
  try {
    await instance.post(`/dashboards/${dashboardId}/invitations`, data);
    console.log("초대하기 요청이 성공적으로 처리되었습니다.");
  } catch (error) {
    console.error("초대하기 요청 중 오류가 발생했습니다:", error);
    throw error;
  }
};

//대시보드 초대 불러오기
export const fetchInvitations = async (
  dashboardId: number,
  page: number = 1,
  size: number = 10,
): Promise<GetInvitationsResponse> => {
  const response = await instance.get<GetInvitationsResponse>(
    `/dashboards/${dashboardId}/invitations`,
    {
      params: { page, size },
    },
  );
  return response.data;
};

//대시보드 초대 취소
export const cancelInvitation = async (
  dashboardId: number,
  invitationId: number,
): Promise<void> => {
  await instance.delete(
    `/dashboards/${dashboardId}/invitations/${invitationId}`,
  );
};
