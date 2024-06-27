import { ReactNode, useEffect } from "react";
import NavMyDashboard from "@/components/Navbar/NavMyDashboard";
import SideMenu from "@/components/SideMenu/SideMenu";
import { useAPI } from "@/hooks/useAPI";
import { AxiosRequestConfig } from "axios";
import { DashboardDetailResponse } from "@/lib/api/types/dashboards";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  dashboardid?: string;
  showActionButton?: boolean;
  showBadgeCounter?: boolean;
  showProfileDropdown?: boolean;
  fetchDashboardData?: boolean;
}

const DashboardLayout = ({
  children,
  title,
  dashboardid,
  showActionButton = true,
  showBadgeCounter = true,
  showProfileDropdown = true,
  fetchDashboardData = true,
}: DashboardLayoutProps) => {
  let dashboardData = null;

  if (fetchDashboardData) {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAyNywidGVhbUlkIjoiNi0yIiwiaWF0IjoxNzE5NDE0NDM0LCJpc3MiOiJzcC10YXNraWZ5In0.JRAWWvLmLkWJQRHJPX1ii6RrW7W8Q9tyRk5ENeFUz5A";

    const dashboardConfig: AxiosRequestConfig = {
      url: `/dashboards/${dashboardid}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = useAPI<DashboardDetailResponse>(
      `dashboardData-${dashboardid}`,
      dashboardConfig,
    );

    dashboardData = data;
  }

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
