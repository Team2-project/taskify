/*
DashboardLayout: MyPage, Dashboard, MyDashboard에 적용하는 Layout
*/

import { FC, ReactNode } from "react";
import NavMyDashboard from "@/components/Navbar/NavMyDashboard";
import SideMenu from "@/components/SideMenu/SideMenu";
import fetcher from "@/lib/api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { User } from "@/lib/api/types/users";
import { DashboardDetailResponse } from "@/lib/api/types/dashboards";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  dashboardId?: string;
  showActionButton?: boolean;
  showBadgeCounter?: boolean;
  showProfileDropdown?: boolean;
  showCreatedByMeIcon?: boolean;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  title,
  dashboardId,
  showActionButton = true,
  showBadgeCounter = true,
  showProfileDropdown = true,
  showCreatedByMeIcon = true,
}) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAyNywidGVhbUlkIjoiNi0yIiwiaWF0IjoxNzE5NjM2ODk2LCJpc3MiOiJzcC10YXNraWZ5In0.6U-hTgLC-PGnoZle_0bOcDA6h4LEgw3QnsXcQyMJLr0";

  const userConfig: AxiosRequestConfig = {
    url: "/users/me",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const dashboardConfig: AxiosRequestConfig = {
    url: `/dashboards/${dashboardId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useQuery<User>({
    queryKey: ["userData"],
    queryFn: () => fetcher<User>(userConfig),
  });

  const {
    data: dashboardData,
    error: dashboardError,
    isLoading: dashboardLoading,
  } = useQuery<DashboardDetailResponse>({
    queryKey: ["dashboardData", dashboardId],
    queryFn: () =>
      fetcher<DashboardDetailResponse>({
        url: `/dashboards/${dashboardId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    enabled: !!dashboardId,
  });

  if (userLoading || (dashboardId && dashboardLoading)) {
    return <div>Loading...</div>;
  }

  if (
    userError ||
    (dashboardId && dashboardError) ||
    !userData ||
    (dashboardId && !dashboardData)
  ) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
  }

  const DashboardTitle = title || (dashboardData ? dashboardData.title : "");
  const createdByMe = dashboardData ? dashboardData.createdByMe : false;

  return (
    <div>
      <div className='flex h-screen flex-col'>
        <NavMyDashboard
          showActionButton={showActionButton}
          showBadgeCounter={showBadgeCounter}
          showProfileDropdown={showProfileDropdown}
          userData={userData}
          dashboardData={
            dashboardData
              ? { ...dashboardData, title: DashboardTitle, createdByMe }
              : { title: DashboardTitle, createdByMe }
          }
          showCreatedByMeIcon={showCreatedByMeIcon}
        />

        <div className='flex flex-1 overflow-hidden'>
          <div className='flex-shrink-0'>
            <SideMenu />
          </div>
          <div className='ml-[300px] flex-1 overflow-auto p-4 max-desktop:ml-[160px] max-tablet:ml-[67px]'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
