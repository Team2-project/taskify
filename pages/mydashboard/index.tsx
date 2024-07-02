import DashboardLayout from "@/components/Layout/DashboardLayout";
import AddButton from "@/components/Button/AddButton/AddButton";
import ListButton from "@/components/Button/ListButton/ListButton";
import CreateDashBoard from "@/components/Modal/CreateDashBoard/CreateDashBoard";
import InvitedDashboard from "@/components/Table/InvitedDashboard/InvitedDashboard";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardsResponse } from "@/lib/api/types/dashboards";
import fetcher from "@/lib/api/fetcher";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import Pagination from "@/components/Pagination/Pagination";

export default function MyDashBoard() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const config: AxiosRequestConfig = {
    url: "/dashboards",
    method: "GET",
    params: {
      navigationMethod: "pagination",
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

  const router = useRouter();

  const BoardButtons = () => {
    return dashboardArray.map((dashboard, index) => (
      <ListButton
        children={dashboard.title}
        onClick={() => {
          router.push(`/dashboard/${dashboard.id}`);
        }}
      />
    ));
  };
  return (
    <>
      <DashboardLayout
        title='내 대시보드'
        showActionButton={false}
        showBadgeCounter={false}
        showProfileDropdown={true}
        showCreatedByMeIcon={false}
      >
        <div>
          <div className='mb-[24px] tablet:mb-[40px]'>
            {/* 대시보드 생성 버튼 */}
            <AddButton
              onClick={() => {
                setIsModalOpen(true);
              }}
              children='새로운 대시보드'
            />
            {/* 대시보드 버튼 목록 */}
            <BoardButtons />
            {/* 페이지네이션 구현 필요 */}
          </div>

          {/* 대시보드 생성 모달창 */}
          <CreateDashBoard
            isOpen={isModalOpen}
            title='새로운 대시보드'
            value=''
            subTitle='대시보드 이름'
            placeholder='대시보드 이름'
            createButtonText='생성'
            cancelButtonText='취소'
            onClose={() => {
              setIsModalOpen(false);
            }}
            onSubmit={() => {}}
            buttonAction={() => {
              router.push(`/dashboard`);
            }}
            onChange={() => {}}
          />

          {/* 초대받은 대시보드 - 있는 경우와 없는 경우에 따른 구현 */}
          <div>
            <InvitedDashboard />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
