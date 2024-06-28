import { FC, ReactNode, useEffect } from "react";
import NavMyDashboard from "@/components/Navbar/NavMyDashboard";
import SideMenu from "@/components/SideMenu/SideMenu";
import fetcher from "@/lib/api/fetcher";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { DashboardDetailResponse } from "@/lib/api/types/dashboards";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  dashboardId?: string;
  showActionButton?: boolean;
  showBadgeCounter?: boolean;
  showProfileDropdown?: boolean;
  fetchDashboardData?: boolean;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  title,
  dashboardId,
  showActionButton = true,
  showBadgeCounter = true,
  showProfileDropdown = true,
  fetchDashboardData = true,
}) => {
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
  }: UseQueryResult<DashboardDetailResponse, Error> = useQuery({
    queryKey: ["dashboardData", dashboardId],
    queryFn: () => fetcher<DashboardDetailResponse>(dashboardConfig),
    enabled: fetchDashboardData && !!dashboardId,
  });

  useEffect(() => {
    if (dashboardData) {
      console.log("Dashboard Data:", dashboardData);
    }
  }, [dashboardData]);

  return (
    <div>
      <NavMyDashboard
        title={title}
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
