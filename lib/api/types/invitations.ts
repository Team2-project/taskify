import { requestToBodyStream } from "next/dist/server/body-streams";
import { instance } from "../axios";

// 내가 받은 초대 목록 조회 응답 타입
export interface Inviter {
  nickname: string;
  email: string;
  id: number;
}

export interface Dashboard {
  title: string;
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

export interface FetchReceivedInvitationsResponse {
  cursorId: number;
  invitations: Invitation[];
}

//내가 받은 초대 목록 조회
export const fetchReceivedInvitations =
  async (): Promise<FetchReceivedInvitationsResponse> => {
    const response =
      await instance.get<FetchReceivedInvitationsResponse>("/invitations");
    return response.data;
  };

//초대 응답
export const respondToInvitation = async (
  invitationId: number,
  data: { inviteAccepted: boolean },
): Promise<Invitation> => {
  const response = await instance.put<Invitation>(
    `/invitations/${invitationId}`,
    data,
  );
  return response.data;
};
