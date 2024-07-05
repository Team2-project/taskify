import { Dispatch, SetStateAction, useState } from "react";
import Button from "@/components/Button";

interface PaginationProps {
  totalCount: number;
  pageSize: number;
}

export default function usePagination({
  totalCount,
  pageSize = 5,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCount / pageSize);

  const [currentPage, setCurrentPage] = useState<number>(1);

  // TODO: 이전 페이지 or 다음 페이지가 없을 경우 버튼이 없어질수있게끔

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
    // api 요청 (currentPage, pageSize)
  };

  const handleNextPage = () => {
    if (currentPage === lastPage) return;
    setCurrentPage((prev) => prev + 1);
  };

  const renderPaginationButtons = () => (
    <div className='flex items-center justify-end gap-[16px]'>
      <span className='text-[14px] font-normal'>
        {lastPage} 페이지 중 {currentPage}
      </span>
      <div>
        <Button.Arrow onClick={handlePrevPage} direction='left' />
        <Button.Arrow onClick={handleNextPage} direction='right' />
      </div>
    </div>
  );

  return { currentPage, renderPaginationButtons };
}
