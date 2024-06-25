import { instance } from "./axios";

export const fetchMembers = async (teamId: string) => {
  const response = await instance.get(`/${teamId}/members`);
  return response.data;
};

export const deleteMember = async (teamId: string, memberId: string) => {
  const response = await instance.delete(`/${teamId}/members/${memberId}`);
  return response.data;
};
