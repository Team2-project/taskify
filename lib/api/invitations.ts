import { instance } from "./axios";

//내가 받은 초대 목록 조회
export const fetchReceivedInvitations = async () => {
  const response = await instance.get(`/invitations`);
  return response.data;
};

//초대 응답
export const respondToInvitation = async (
  invitationId: string,
  data: { status: string },
) => {
  const response = await instance.put(`/invitations/${invitationId}`, data);
  return response.data;
};
