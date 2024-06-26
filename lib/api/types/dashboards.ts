/*
dashboards: 대시보드 생성 + 목록 조회 + 상세 조회 + 수정 + 삭제 + 초대하기 + 초대 불러오기 + 초대 취소 타입 정의
*/

// 대시보드 생성 요청 타입 정의
export interface CreateDashboardRequest {
  title: string;
  color: string;
}

// 대시보드 생성 응답 타입 정의
export interface DashboardResponse {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

// 대시보드 목록 조회 요청 타입 정의
export interface GetDashboardsRequest {
  navigationMethod: "infiniteScroll" | "pagination";
  cursorId?: number;
  page?: number;
  size?: number;
}

// 대시보드 목록 조회 응답 타입 정의
export interface DashboardsResponse {
  cursorId: number;
  totalCount: number;
  dashboards: DashboardResponse[];
}

// 대시보드 상세 조회 응답 타입 정의
export type DashboardDetailResponse = DashboardResponse;

// 대시보드 수정 요청 타입 정의
export interface UpdateDashboardRequest {
  title: string;
  color: string;
}

// 대시보드 초대 요청 타입 정의
export interface InviteDashboardRequest {
  email: string;
}

// 대시보드 초대 응답 타입 정의
export interface InvitationResponse {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

// 대시보드 초대 목록 조회 요청 타입 정의
export interface GetDashboardInvitationsRequest {
  dashboardId: number;
  page?: number;
  size?: number;
}

// 대시보드 초대 목록 조회 응답 타입 정의
export interface DashboardInvitationsResponse {
  totalCount: number;
  invitations: InvitationResponse[];
}
