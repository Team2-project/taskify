import { instance } from "./axios";

//대시보드 생성
export const createDashboard = async (data: { title: string }) => {
  const response = await instance.post(`/dashboards`, data);
  return response.data;
};

//대시보드 목록 조회
export const fetchDashboards = async () => {
  const response = await instance.get(`/dashboards`);
  return response.data;
};

//대시보드 상세 조회
export const fetchDashboardDetails = async (dashboardId: string) => {
  const response = await instance.get(`/dashboards/${dashboardId}`);
  return response.data;
};

//대시보드 수정
export const updateDashboard = async (
  dashboardId: string,
  data: { title: string },
) => {
  const response = await instance.put(`/dashboards/${dashboardId}`, data);
  return response.data;
};

//대시보드 삭제
export const deleteDashboard = async (dashboardId: string) => {
  const response = await instance.delete(`/dashboards/${dashboardId}`);
  return response.data;
};

//대시보드 초대하기
export const inviteToDashboard = async (
  dashboardId: string,
  data: { email: string },
) => {
  const response = await instance.post(
    `/dashboards/${dashboardId}/invitations`,
    data,
  );
  return response.data;
};

//대시보드 초대 불러오기
export const fetchInvitations = async (dashboardId: string) => {
  const response = await instance.get(`/dashboards/${dashboardId}/invitations`);
  return response.data;
};

//대시보드 초대 취소
export const cancelInvitation = async (
  dashboardId: string,
  invitationId: string,
) => {
  const response = await instance.delete(
    `/dashboards/${dashboardId}/invitations/${invitationId}`,
  );
  return response.data;
};
