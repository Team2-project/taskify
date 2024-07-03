import React, { useState } from "react";
import BoardColumn from "./Card/BoardColumn";
import { useRouter } from "next/router";
import { AxiosRequestConfig } from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import fetcher from "@/lib/api/fetcher";
import { ColumnResponse } from "@/lib/api/types/columns";
import Button from "@/components/Button";
import AddColumn from "@/components/DashBoard/Modal/AddColumn";

interface Props {
  color: string;
}

const DashBoard = ({ color }: Props) => {
  const router = useRouter();
  const { dashboardId } = router.query;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const columnsConfig: AxiosRequestConfig = {
    url: `/columns?dashboardId=${dashboardId}`,
    method: "GET",
  };

  const {
    data: columnsData,
    error: columnsError,
    isLoading: columnsLoading,
  }: UseQueryResult<
    { result: string; data: ColumnResponse[] },
    Error
  > = useQuery({
    queryKey: ["columnsData", dashboardId],
    queryFn: () =>
      fetcher<{ result: string; data: ColumnResponse[] }>(columnsConfig),
    enabled: !!dashboardId,
  });

  if (!dashboardId || Array.isArray(dashboardId)) {
    return <div>유효하지 않은 대시보드 ID</div>;
  }

  if (columnsLoading) {
    return <div>로딩 중...</div>;
  }

  if (columnsError) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
  }

  if (!columnsData || !columnsData.data) {
    return <div>데이터가 없습니다</div>;
  }

  // 기존 제목 목록을 전달하기 위해
  const existingTitles = columnsData.data.map((column) => column.title);

  return (
    <div className='mb-28 desktop:mb-1 desktop:flex'>
      {columnsData.data.map((item) => (
        <BoardColumn
          key={item.id}
          columnId={item.id}
          title={item.title}
          color={color}
        />
      ))}
      <div className='p-[9px] desktop:m-[20px] desktop:mt-[60px]'>
        <Button.Add onClick={handleClick} className='desktop:w-354'>
          새로운 칼럼 추가하기
        </Button.Add>
      </div>
      <AddColumn
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        existingTitles={existingTitles}
      />
    </div>
  );
};

export default DashBoard;
