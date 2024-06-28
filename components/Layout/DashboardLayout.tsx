import { ReactNode, useEffect } from "react";
import NavMyDashboard from "@/components/Navbar/NavMyDashboard";
import SideMenu from "@/components/SideMenu/SideMenu";
import { useAPI } from "@/hooks/useAPI";
import { AxiosRequestConfig } from "axios";
import { DashboardDetailResponse } from "@/lib/api/types/dashboards";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  dashboardId: string;
  showActionButton?: boolean;
  showBadgeCounter?: boolean;
  showProfileDropdown?: boolean;
}

const DashboardLayout = ({
  children,
  title,
  dashboardId,
  showActionButton = true,
  showBadgeCounter = true,
  showProfileDropdown = true,
}: DashboardLayoutProps) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAyNywidGVhbUlkIjoiNi0yIiwiaWF0IjoxNzE5NDE0NDM0LCJpc3MiOiJzcC10YXNraWZ5In0.JRAWWvLmLkWJQRHJPX1ii6RrW7W8Q9tyRk5ENeFUz5A";

  const dashboardConfig: AxiosRequestConfig = {
    url: `/dashboards/${dashboardId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const {
    data: dashboardData,
    error: dashboardError,
    isLoading: dashboardLoading,
  } = useAPI<DashboardDetailResponse>(
    `dashboardData-${dashboardId}`,
    dashboardConfig,
  );

  useEffect(() => {
    if (dashboardData) {
      console.log("Dashboard Data:", dashboardData);
    }
  }, [dashboardData]);

  if (dashboardLoading) {
    return <div>로딩 중...</div>;
  }

  if (dashboardError || !dashboardData) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
  }

  return (
    <div>
      <NavMyDashboard
        title={title}
        createdByMe={dashboardData.createdByMe}
        showActionButton={showActionButton}
        showBadgeCounter={showBadgeCounter}
        showProfileDropdown={showProfileDropdown}
      />
      <SideMenu />
      {children}
    </div>
  );
};

export default DashboardLayout;
