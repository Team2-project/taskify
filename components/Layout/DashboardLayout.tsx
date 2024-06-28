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
  children: React.ReactNode;
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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAyNywidGVhbUlkIjoiNi0yIiwiaWF0IjoxNzE5NDE0NDM0LCJpc3MiOiJzcC10YXNraWZ5In0.JRAWWvLmLkWJQRHJPX1ii6RrW7W8Q9tyRk5ENeFUz5A";

  const userConfig: AxiosRequestConfig = {
    url: "/users/me",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const dashboardConfig: AxiosRequestConfig = {
    url: "/dashboards/9807",
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
    queryKey: ["dashboardData"],
    queryFn: () => fetcher<DashboardDetailResponse>(dashboardConfig),
  });

  if (userLoading || dashboardLoading) {
    return <div>Loading...</div>;
  }

  if (userError || dashboardError || !userData || !dashboardData) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
  }

  const DashboardTitle = title || dashboardData.title;
  const { createdByMe } = dashboardData;

  return (
    <div>
      <NavMyDashboard
        showActionButton={showActionButton}
        showBadgeCounter={showBadgeCounter}
        showProfileDropdown={showProfileDropdown}
        userData={userData}
        dashboardData={{ ...dashboardData, title: DashboardTitle, createdByMe }}
        showCreatedByMeIcon={showCreatedByMeIcon}
      />
      <SideMenu />
      {children}
    </div>
  );
};

export default DashboardLayout;
