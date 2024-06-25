import { instance } from "./axios";

//카드 생성
export const createCard = async (data: {
  title: string;
  description: string;
}) => {
  const response = await instance.post(`/cards`, data);
  return response.data;
};

//카드 목록 조회
export const fetchCards = async () => {
  const response = await instance.get(`/cards`);
  return response.data;
};

//카드 수정
export const updateCard = async (
  cardId: string,
  data: { title: string; description: string },
) => {
  const response = await instance.put(`/cards/${cardId}`, data);
  return response.data;
};

//카드 상세 조회
export const fetchCardDetails = async (cardId: string) => {
  const response = await instance.get(`/cards/${cardId}`);
  return response.data;
};

//카드 삭제
export const deleteCard = async (cardId: string) => {
  const response = await instance.delete(`/cards/${cardId}`);
  return response.data;
};
