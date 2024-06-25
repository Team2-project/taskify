import { instance } from "./axios";

//컬럼 생성
export const createColumn = async (data: { title: string }) => {
  const response = await instance.post(`/columns`, data);
  return response.data;
};

//컬럼 목록 조회
export const fetchColumns = async () => {
  const response = await instance.get(`/columns`);
  return response.data;
};

//컬럼 수정
export const updateColumn = async (
  columnId: string,
  data: { title: string },
) => {
  const response = await instance.put(`/columns/${columnId}`, data);
  return response.data;
};

//컬럼 삭제
export const deleteColumn = async (columnId: string) => {
  const response = await instance.delete(`/columns/${columnId}`);
  return response.data;
};

//카드 이미지 업로드
export const uploadCardImage = async (columnId: string, data: FormData) => {
  const response = await instance.post(
    `/columns/${columnId}/card-image`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};
