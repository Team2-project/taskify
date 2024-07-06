/* 대시보드 이름이나 색 변경에 관한 코드 */
import React, { useState, useEffect } from "react";
import DashBoardForm from "./components/DashBoardForm";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { dashboardTitleAtom, dashboardColorAtom } from "@/atoms/dashboardAtom";
import useDashboard from "@/hooks/useDashboard";

const colors = ["green", "purple", "orange", "blue", "pink"] as const;
type Color = (typeof colors)[number];

// API에서 받아온 HEX 코드를 색상과 매치
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
  const { dashboards, isLoading, error, editDashboard } = useDashboard();

  // 대시보드 데이터를 가져옵니다.
  const dashboardData = dashboards?.find(
    (dashboard) => dashboard.id === Number(dashboardId),
  );

  // 초기 선택 색상을 설정
  const initialColor =
    (Object.keys(colorMap) as Color[]).find(
      (key) => colorMap[key] === dashboardData?.color,
    ) || "green";

  const [changeTitle, setChangeTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState<Color>(initialColor);
  const [dashboardTitle, setDashboardTitle] = useAtom(dashboardTitleAtom);
  const [dashboardColor, setDashboardColor] = useAtom(dashboardColorAtom);

  // 데이터가 로드될 때마다 상태를 업데이트합니다.
  useEffect(() => {
    if (dashboardData) {
      setDashboardTitle(dashboardData.title);
      setDashboardColor(dashboardData.color);
      setSelectedColor(
        (Object.keys(colorMap) as Color[]).find(
          (key) => colorMap[key] === dashboardData.color,
        ) || "green",
      );
    }
  }, [dashboardData, setDashboardTitle, setDashboardColor]);

  const handleColorChange = (color: Color) => {
    setSelectedColor(color);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeTitle(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      editDashboard({
        dashboardId: Number(dashboardId),
        dashboardData: {
          title: changeTitle || dashboardTitle,
          color: colorMap[selectedColor],
        },
      });
    } catch (error) {
      console.error("대시보드 변경 중 오류가 발생했습니다:", error);
    }
  };

  if (!dashboardId || Array.isArray(dashboardId)) {
    return <div>유효하지 않은 대시보드 ID</div>;
  }

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error || !dashboardData) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
  }

  return (
    <div className='h-211 max-w-[620px] rounded-lg bg-white px-[20px] py-[21px] shadow tablet:h-256 tablet:px-[28px] tablet:py-[32px] desktop:h-256'>
      <div className='flex items-center justify-between pb-[24px]'>
        <h3 className='text-xl font-bold'>{dashboardTitle}</h3>
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
          placeholder='수정할 대시보드 제목 입력해주세요'
        />
        <DashBoardForm.Button type='button' onClick={handleSubmit}>
          변경
        </DashBoardForm.Button>
      </DashBoardForm>
    </div>
  );
};

export default ChangeCard;
