import { instance } from "./axios";

export const createCard = async (
  teamId: string,
  data: { title: string; description: string },
) => {
  const response = await instance.post(`/${teamId}/cards`, data);
  return response.data;
};

export const fetchCards = async (teamId: string) => {
  const response = await instance.get(`/${teamId}/cards`);
  return response.data;
};

export const updateCard = async (
  teamId: string,
  cardId: string,
  data: { title: string; description: string },
) => {
  const response = await instance.put(`/${teamId}/cards/${cardId}`, data);
  return response.data;
};

export const fetchCardDetails = async (teamId: string, cardId: string) => {
  const response = await instance.get(`/${teamId}/cards/${cardId}`);
  return response.data;
};

export const deleteCard = async (teamId: string, cardId: string) => {
  const response = await instance.delete(`/${teamId}/cards/${cardId}`);
  return response.data;
};
