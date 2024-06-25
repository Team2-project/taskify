import { instance } from "./axios";

export const createColumn = async (teamId: string, data: { title: string }) => {
  const response = await instance.post(`/${teamId}/columns`, data);
  return response.data;
};

export const fetchColumns = async (teamId: string) => {
  const response = await instance.get(`/${teamId}/columns`);
  return response.data;
};

export const updateColumn = async (
  teamId: string,
  columnId: string,
  data: { title: string },
) => {
  const response = await instance.put(`/${teamId}/columns/${columnId}`, data);
  return response.data;
};

export const deleteColumn = async (teamId: string, columnId: string) => {
  const response = await instance.delete(`/${teamId}/columns/${columnId}`);
  return response.data;
};

export const uploadCardImage = async (
  teamId: string,
  columnId: string,
  data: FormData,
) => {
  const response = await instance.post(
    `/${teamId}/columns/${columnId}/card-image`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};
