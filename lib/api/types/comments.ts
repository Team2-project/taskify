/*
comments: 댓글 생성 + 목록조회 + 댓글수정 + 댓글 삭제  타입 정의
*/

// 댓글 생성 요청 타입 정의
export interface CreateCommentRequest {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

// 댓글 응답 타입 정의
export interface CommentResponse {
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
}

// 댓글 목록 조회 요청 타입 정의
export interface GetCommentsRequest {
  size?: number;
  cursorId?: number;
  cardId: number;
}

// 댓글 목록 조회 응답 타입 정의
export interface CommentsResponse {
  cursorId: number;
  comments: CommentResponse[];
}

// 댓글 수정 요청 타입 정의
export interface UpdateCommentRequest {
  content: string;
}

// 댓글 삭제 요청 타입 정의 (파라미터로 commentId 사용)
export interface DeleteCommentRequest {
  commentId: number;
}
