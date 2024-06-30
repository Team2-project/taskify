// DashBoard.tsx
import BoardColumn from "./Card/BoardColumn";
import Image from "next/image";
import { useRouter } from "next/router";
import { AxiosRequestConfig } from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import fetcher from "@/lib/api/fetcher";
import { ColumnResponse } from "@/lib/api/types/columns";
import Button from "@/components/Button";

interface Props {
  color: string;
}

const DashBoard = ({ color }: Props) => {
  const router = useRouter();
  const { dashboardId } = router.query;

  const handleClick = () => {
    alert("여기에 이제 칼럼 추가하는 모달창 연결해야 함!!!");
  };

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAyNywidGVhbUlkIjoiNi0yIiwiaWF0IjoxNzE5NDE0NDM0LCJpc3MiOiJzcC10YXNraWZ5In0.JRAWWvLmLkWJQRHJPX1ii6RrW7W8Q9tyRk5ENeFUz5A"; // 실제 토큰으로 교체

  const columnsConfig: AxiosRequestConfig = {
    url: `/columns?dashboardId=${dashboardId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

  return (
    <div className='mb-28 desktop:mb-1 desktop:flex'>
      {columnsData.data.map((item) => (
        <div
          key={item.id}
          className='border-y border-gray-20 desktop:w-354 desktop:border-x desktop:border-y-0'
        >
          <div className='flex h-22 items-center justify-between px-[15px] pb-[10px] pt-[25px]'>
            <div className='flex items-center gap-0.5'>
              <div
                className='mr-2 h-8 w-8 rounded-full'
                style={{ backgroundColor: color }}
              />
              <h2 className='text-base font-bold'>{item.title}</h2>
              <span></span>
            </div>
            <button>
              <Image
                src='/icon/ic_setting.svg'
                alt='톱니바퀴'
                width={22}
                height={22}
                className='tablet:h-24 tablet:w-24'
              />
            </button>
          </div>
          <BoardColumn columnId={item.id} />
        </div>
      ))}
      <div className='p-[9px] desktop:m-[20px] desktop:mt-[60px]'>
        <Button.Add onClick={handleClick} className='desktop:w-354'>
          새로운 칼럼 추가하기
        </Button.Add>
      </div>
    </div>
  );
};

export default DashBoard;
