import { useState } from "react";
import DashBoardForm from "./components/DashBoardForm";
import { useRouter } from "next/router";
import { AxiosRequestConfig, AxiosError } from "axios";
import { DashboardDetailResponse } from "@/lib/api/types/dashboards";
import { useQuery, UseQueryResult, useMutation } from "@tanstack/react-query";
import fetcher from "@/lib/api/fetcher";

const colors = ["green", "purple", "orange", "blue", "pink"] as const;
type Color = (typeof colors)[number];

const colorMap: Record<Color, string> = {
  green: "#7AC555",
  purple: "#760DDE",
  orange: "#FFA500",
  blue: "#76A5EA",
  pink: "#E876EA",
};

const ChangeCard = () => {
  const router = useRouter();
  const { dashboardId } = router.query;

  const dashboardConfig: AxiosRequestConfig = {
    url: `/dashboards/${dashboardId}`,
    method: "GET",
  };

  const {
    data: dashboardData,
    error: dashboardError,
    isLoading: dashboardLoading,
  }: UseQueryResult<DashboardDetailResponse, Error> = useQuery({
    queryKey: ["dashboardData", dashboardId],
    queryFn: () => fetcher<DashboardDetailResponse>(dashboardConfig),
    enabled: !!dashboardId,
  });

  const mutation = useMutation<
    DashboardDetailResponse,
    AxiosError,
    { title: string; color: string }
  >({
    mutationFn: async (variables) => {
      const response = await fetcher<DashboardDetailResponse>({
        url: `/dashboards/${dashboardId}`,
        method: "PUT",
        data: variables,
      });
      return response;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (!dashboardId || Array.isArray(dashboardId)) {
    return <div>유효하지 않은 대시보드 ID</div>;
  }

  if (dashboardLoading) {
    return <div>로딩 중...</div>;
  }

  if (dashboardError || !dashboardData) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
  }

  const initialColor =
    (Object.keys(colorMap) as Color[]).find(
      (key) => colorMap[key] === dashboardData.color,
    ) || "green"; // 기본 색상 설정

  const [title, setTitle] = useState(dashboardData.title);
  const [selectedColor, setSelectedColor] = useState<Color>(initialColor);
  const [changeTitle, setChangeTitle] = useState("");

  const handleColorChange = (color: Color) => {
    setSelectedColor(color);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeTitle(e.target.value);
  };

  const handleSubmit = () => {
    mutation.mutate({
      title: changeTitle || title,
      color: colorMap[selectedColor],
    });
  };

  return (
    <div className='h-211 max-w-[620px] rounded-lg bg-white px-[20px] py-[21px] shadow tablet:h-256 tablet:px-[28px] tablet:py-[32px] desktop:h-256'>
      <div className='flex items-center justify-between pb-[24px]'>
        <h3 className='text-xl font-bold'>{dashboardData.title}</h3>
        <div className='relative flex space-x-2'>
          {colors.map((color) => (
            <div
              key={color}
              className={`relative flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full ${
                selectedColor === color ? "" : "hidden tablet:flex"
              }`}
              onClick={() => handleColorChange(color)}
            >
              <img
                src={`/chip/${color}.svg`}
                alt={color}
                className='flex h-full w-full items-center justify-between rounded-full'
              />
              {selectedColor === color && (
                <img
                  src='/chip/check.svg'
                  alt='check'
                  className='absolute flex h-[22px] w-[22px] items-center justify-center text-white'
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <DashBoardForm onSubmit={handleSubmit}>
        <DashBoardForm.Field
          label='대시보드 이름'
          type='text'
          name='title'
          value={changeTitle}
          onChange={handleTitleChange}
          placeholder='수정할 대시보드 Title 입력'
        />
        <DashBoardForm.Button>변경</DashBoardForm.Button>
      </DashBoardForm>
    </div>
  );
};

export default ChangeCard;
