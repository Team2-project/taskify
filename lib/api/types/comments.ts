import { instance } from "../axios";

// 댓글 생성 요청 데이터 타입
export interface CreateCommentData {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

// 댓글 목록 조회 응답 데이터 타입
export interface FetchCommentsResponse {
  cursorId: number;
  comments: {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    cardId: number;
    author: {
      profileImageUrl: string;
      nickname: string;
      id: number;
    };
  }[];
}

// 댓글 수정 요청 데이터 타입
export interface UpdateCommentData {
  content: string;
}

// 댓글 삭제 요청 데이터 타입
export interface DeleteCommentData {
  commentId: number;
}

//댓글 생성
export const createComment = async (data: CreateCommentData): Promise<any> => {
  const response = await instance.post(`/comments`, data);
  return response.data;
};

//댓글 목록 조회
export const fetchComments = async (
  cardId: number,
): Promise<FetchCommentsResponse> => {
  const response = await instance.get<FetchCommentsResponse>(`/comments`, {
    params: { cardId },
  });
  return response.data;
};

//댓글 수정
export const updateComment = async (
  commentId: number,
  data: UpdateCommentData,
): Promise<any> => {
  const response = await instance.put(`/comments/${commentId}`, data);
  return response.data;
};

//댓글 삭제
export const deleteComment = async (commentId: number): Promise<void> => {
  await instance.delete(`/comments/${commentId}`);
};
