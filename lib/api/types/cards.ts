/*
 컬럼 생성 + 목록 조회 + 수정 + 삭제 + 카드 이미지 업로드 타입 정의
 */

// 카드 생성 시 요청하는 데이터 타입
export interface CreateCardData {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

// 카드 목록 조회 시 반환되는 데이터 타입
export interface FetchCardsResponse {
  cursorId: number;
  totalCount: number;
  cards: {
    id: number;
    title: string;
    description: string;
    tags: string[];
    dueDate: string;
    assignee: {
      profileImageUrl: string;
      nickname: string;
      id: number;
    };
    imageUrl: string;
    teamId: string;
    columnId: number;
    createdAt: string;
    updatedAt: string;
  }[];
}

// 카드 수정 시 요청하는 데이터 타입
export interface UpdateCardData {
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

// 카드 상세 조회 시 반환되는 데이터 타입
export interface FetchCardDetailsResponse {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

// 카드 삭제 시 요청하는 데이터 타입
export interface DeleteCardData {
  cardId: number;
}

//카드 생성
export const createCard = async (
  data: CreateCardData,
): Promise<CreateCardData> => {
  const response = await instance.post<CreateCardData>(`/cards`, data);
  return response.data;
};

//카드 목록 조회
export const fetchCards = async (): Promise<FetchCardsResponse> => {
  const response = await instance.get<FetchCardsResponse>(`/cards`);
  return response.data;
};

//카드 수정
export const updateCard = async (
  cardId: number,
  data: CreateCardData,
): Promise<UpdateCardData> => {
  const response = await instance.put<UpdateCardData>(`/cards/${cardId}`, data);
  return response.data;
};

//카드 상세 조회
export const fetchCardDetails = async (
  cardId: number,
): Promise<FetchCardDetailsResponse> => {
  const response = await instance.get<FetchCardDetailsResponse>(
    `/cards/${cardId}`,
  );
  return response.data;
};

//카드 삭제
export const deleteCard = async (cardId: number): Promise<void> => {
  await instance.delete(`/cards/${cardId}`);
};
