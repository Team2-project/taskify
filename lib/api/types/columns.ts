import { instance } from "../axios";

//컬럼 생성 데이터 타입
export interface CreateColumn {
  title: string;
  dashboardId: number;
}

//컬럼 목록 조회 데이터 타입
export interface FetchColumns {
  result: "SUCCESS";
  data: [
    {
      id: number;
      title: string;
      teamId: string;
      createdAt: string;
      updatedAt: string;
    },
  ];
}

//컬럼 수정 데이터 타입
export interface UpdateColumn {
  title: string;
}

//컬럼 삭제 데이터 타입
export interface DeleteColumn {
  columnId: number;
}

//카드이미지업로드 데이터 타입
export interface UploadCardImage {
  columnId: number;
  image: File;
}

//컬럼 생성
export const createColumn = async (data: CreateColumn): Promise<any> => {
  const response = await instance.post(`/columns`, data);
  return response.data;
};

//컬럼 목록 조회
export const fetchColumns = async (): Promise<FetchColumns> => {
  const response = await instance.get(`/columns`);
  return response.data;
};

//컬럼 수정
export const updateColumn = async (
  columnId: number,
  data: UpdateColumn,
): Promise<any> => {
  const response = await instance.put(`/columns/${columnId}`, data);
  return response.data;
};

//컬럼 삭제
export const deleteColumn = async (columnId: number): Promise<any> => {
  const response = await instance.delete(`/columns/${columnId}`);
  return response.data;
};

//카드 이미지 업로드
export const uploadCardImage = async (
  columnId: number,
  image: File,
): Promise<any> => {
  const formData = new FormData();
  formData.append("columnId", columnId.toString());
  formData.append("image", image);

  const response = await instance.post(
    `/columns/${columnId}/card-image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};
