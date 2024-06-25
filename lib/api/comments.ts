import { instance } from "./axios";

export const createComment = async (
  teamId: string,
  data: { cardId: string; content: string },
) => {
  const response = await instance.post(`/${teamId}/comments`, data);
  return response.data;
};

export const fetchComments = async (teamId: string, cardId: string) => {
  const response = await instance.get(`/${teamId}/comments`, {
    params: { cardId },
  });
  return response.data;
};

export const updateComment = async (
  teamId: string,
  commentId: string,
  data: { content: string },
) => {
  const response = await instance.put(`/${teamId}/comments/${commentId}`, data);
  return response.data;
};

export const deleteComment = async (teamId: string, commentId: string) => {
  const response = await instance.delete(`/${teamId}/comments/${commentId}`);
  return response.data;
};
