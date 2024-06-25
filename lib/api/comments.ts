import { instance } from "./axios";

//댓글 생성
export const createComment = async (data: {
  cardId: string;
  content: string;
}) => {
  const response = await instance.post(`/comments`, data);
  return response.data;
};

//댓글 목록 조회
export const fetchComments = async (cardId: string) => {
  const response = await instance.get(`/comments`, {
    params: { cardId },
  });
  return response.data;
};

//댓글 수정
export const updateComment = async (
  commentId: string,
  data: { content: string },
) => {
  const response = await instance.put(`/comments/${commentId}`, data);
  return response.data;
};

//댓글 삭제
export const deleteComment = async (commentId: string) => {
  const response = await instance.delete(`/comments/${commentId}`);
  return response.data;
};
