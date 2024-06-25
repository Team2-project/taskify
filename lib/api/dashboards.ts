import { instance } from "./axios";

export const createDashboard = async (
  teamId: string,
  data: { title: string },
) => {
  const response = await instance.post(`/${teamId}/dashboards`, data);
  return response.data;
};

export const fetchDashboards = async (teamId: string) => {
  const response = await instance.get(`/${teamId}/dashboards`);
  return response.data;
};

export const fetchDashboardDetails = async (
  teamId: string,
  dashboardId: string,
) => {
  const response = await instance.get(`/${teamId}/dashboards/${dashboardId}`);
  return response.data;
};

export const updateDashboard = async (
  teamId: string,
  dashboardId: string,
  data: { title: string },
) => {
  const response = await instance.put(
    `/${teamId}/dashboards/${dashboardId}`,
    data,
  );
  return response.data;
};

export const deleteDashboard = async (teamId: string, dashboardId: string) => {
  const response = await instance.delete(
    `/${teamId}/dashboards/${dashboardId}`,
  );
  return response.data;
};

export const inviteToDashboard = async (
  teamId: string,
  dashboardId: string,
  data: { email: string },
) => {
  const response = await instance.post(
    `/${teamId}/dashboards/${dashboardId}/invitations`,
    data,
  );
  return response.data;
};

export const fetchInvitations = async (teamId: string, dashboardId: string) => {
  const response = await instance.get(
    `/${teamId}/dashboards/${dashboardId}/invitations`,
  );
  return response.data;
};

export const cancelInvitation = async (
  teamId: string,
  dashboardId: string,
  invitationId: string,
) => {
  const response = await instance.delete(
    `/${teamId}/dashboards/${dashboardId}/invitations/${invitationId}`,
  );
  return response.data;
};
