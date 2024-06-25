import { instance } from "./axios";

export const fetchReceivedInvitations = async (teamId: string) => {
  const response = await instance.get(`/${teamId}/invitations`);
  return response.data;
};

export const respondToInvitation = async (
  teamId: string,
  invitationId: string,
  data: { status: string },
) => {
  const response = await instance.put(
    `/${teamId}/invitations/${invitationId}`,
    data,
  );
  return response.data;
};
