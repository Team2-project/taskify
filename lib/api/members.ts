import { instance } from "./axios";

//대시보드 멤버 목록 조회
export const fetchMembers = async () => {
  const response = await instance.get(`/members`);
  return response.data;
};

//대시보드 멤버 삭제
export const deleteMember = async (memberId: string) => {
  const response = await instance.delete(`/members/${memberId}`);
  return response.data;
};
