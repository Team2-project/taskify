/*
columns: 컬럼 생성 + 목록 조회 + 수정 + 삭제 + 카드 이미지 업로드 타입 정의
*/

// 컬럼 생성 요청 타입 정의
export interface CreateColumnRequest {
  title: string;
  dashboardId: number;
}

// 컬럼 응답 타입 정의
export interface ColumnResponse {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

// 카드 이미지 업로드 요청 타입 정의
export interface UploadCardImageRequest {
  columnId: number;
  image: File;
}

// 카드 이미지 업로드 응답 타입 정의
export interface UploadCardImageResponse {
  imageUrl: string;
}

// 댓글 목록 조회 요청 타입 정의
// 댓글 관련 타입 정의는 types/comments.ts에 이미 정의되어 있음
export interface GetCommentsRequest {
  size?: number;
  cursorId?: number;
  cardId: number;
}

// 댓글 응답 타입 정의
// types/comments.ts에 이미 정의되어 있음
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

// 댓글 목록 조회 응답 타입 정의
// types/comments.ts에 이미 정의되어 있음
export interface CommentsResponse {
  cursorId: number;
  comments: CommentResponse[];
}

// 댓글 수정 요청 타입 정의
//types/comments.ts에 이미 정의되어 있음
export interface UpdateCommentRequest {
  content: string;
}

// 댓글 삭제 요청 타입 정의
// 파라미터로 commentId 사용
// types/comments.ts에 이미 정의되어 있음
export interface DeleteCommentRequest {
  commentId: number;
}
