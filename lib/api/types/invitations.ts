/*
invitations: 초대목록 조회 + 응답 타입 정의
*/

// 조회 요청 타입 정의
export interface InvitationsRequest {
  size?: number;
  cursorId?: number;
  title?: string;
}

// 초대 응답 요청 타입 정의
export interface InvitationResponseRequest {
  inviteAccepted: boolean;
}

// 조회 응답 타입 정의
export interface Invitation {
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

export interface InvitationsResponse {
  cursorId: number;
  invitations: Invitation[];
}

// 초대 응답 결과 타입 정의
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
