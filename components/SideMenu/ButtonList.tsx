import ColorChip from "@/public/chip/circle_small.svg";
import CrownIcon from "@/public/icon/ic_crown.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useDashboard from "@/hooks/useDashboard";
import { DashboardResponse } from "@/lib/api/types/dashboards";

const ButtonList = () => {
  const router = useRouter();
  const { dashboardId } = router.query;

  // useDashboard 훅을 사용하여 대시보드 데이터를 가져옵니다.
  const { dashboards, isLoading, error } = useDashboard();

  //버튼 클릭 시 색 변하도록 하는 함수
  const [buttonColor, setButtonColor] = useState<number | null>(null);
  const handleButtonColor = (index: number) => {
    setButtonColor(index);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error || !dashboards) {
    return null;
  }

  return (
    <div
      className='flex flex-col-reverse items-start justify-start'
      style={{ overflowY: "auto" }}
    >
      {dashboards.map((dashboard: DashboardResponse, index: number) => {
        const isCurrentDashboard = dashboard.id === Number(dashboardId);
        const title = dashboard.title;
        const color = dashboard.color;

        return (
          <Link href={`/dashboard/${dashboard.id}`} key={index}>
            <button
              onClick={() => handleButtonColor(index)}
              className={`${
                buttonColor === index ? "bg-[#F1EFFD]" : "bg-none"
              } flex h-[45px] w-[276px] cursor-pointer items-center justify-start rounded-[4px] hover:bg-[#F1EFFD] max-desktop:w-[134px] max-tablet:w-fit`}
            >
              <ColorChip fill={color} />
              <p className='flex items-center justify-start gap-2 truncate text-gray-50 max-desktop:gap-1.5 max-tablet:hidden'>
                {title}
                {dashboard.createdByMe ? (
                  <CrownIcon className='viewBox-[0 0 18 14] h-[14px] w-[18px] max-desktop:h-[12px] max-desktop:w-[16px]' />
                ) : null}
              </p>
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default ButtonList;
