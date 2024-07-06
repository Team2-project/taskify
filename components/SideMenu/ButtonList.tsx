import fetcher from "@/lib/api/fetcher";
import {
  DashboardsResponse,
  DashboardResponse,
} from "@/lib/api/types/dashboards";
import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import ColorChip from "@/public/chip/circle_small.svg";
import CrownIcon from "@/public/icon/ic_crown.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { dashboardTitleAtom, dashboardColorAtom } from "@/atoms/dashboardAtom";

const getDashboard = (): DashboardResponse[] | null | JSX.Element => {
  const config: AxiosRequestConfig = {
    url: "/dashboards",
    method: "GET",
    params: {
      navigationMethod: "infiniteScroll",
      size: 40,
    },
  };

  const {
    data: dashboardData,
    error: dashboardError,
    isLoading: dashboardloading,
  } = useQuery<DashboardsResponse>({
    queryKey: ["DashboardsResponse"],
    queryFn: () => fetcher<DashboardsResponse>(config),
  });

  if (dashboardloading) {
    return <div>Loading...</div>;
  }
  if (dashboardError || !dashboardData) {
    return null;
  }

  const dashboardArray = dashboardData.dashboards;
  return dashboardArray;
};

const ButtonList = () => {
  const router = useRouter();
  const { dashboardId } = router.query;
  const dashboardArray = getDashboard();

  // Atoms를 사용하여 제목과 색상을 가져옴
  const [dashboardTitle] = useAtom(dashboardTitleAtom);
  const [dashboardColor] = useAtom(dashboardColorAtom);

  if (Array.isArray(dashboardArray)) {
    return (
      <div className='flex flex-col-reverse items-start justify-start'>
        {dashboardArray.map((dashboard: DashboardResponse, index: number) => {
          const isCurrentDashboard = dashboard.id === Number(dashboardId);
          const title =
            isCurrentDashboard && dashboardTitle
              ? dashboardTitle
              : dashboard.title;
          const color =
            isCurrentDashboard && dashboardColor
              ? dashboardColor
              : dashboard.color;

          return (
            <Link href={`/dashboard/${dashboard.id}`} key={index}>
              <button className='flex h-[45px] w-[276px] cursor-pointer items-center justify-start rounded-[4px] active:bg-[#F1EFFD] max-desktop:w-[134px] max-tablet:w-fit'>
                <ColorChip fill={color} />
                <p className='flex items-center justify-start gap-2 text-gray-50 max-desktop:gap-1.5 max-tablet:hidden'>
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
  }
  return null;
};

export default ButtonList;
