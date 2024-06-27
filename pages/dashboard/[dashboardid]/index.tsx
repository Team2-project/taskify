import { useRouter } from "next/router";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useAPI } from "@/hooks/useAPI";
import { AxiosRequestConfig } from "axios";
import { DashboardDetailResponse } from "@/lib/api/types/dashboards";

const DashboardEditPage = () => {
  const router = useRouter();
  const { dashboardid } = router.query;

  // dashboardId 콘솔에 출력하여 확인
  console.log("Router Query:", router.query);
  console.log("Dashboard ID:", dashboardid);

  if (!dashboardid || Array.isArray(dashboardid)) {
    return <div>유효하지 않은 대시보드 ID</div>;
  }

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAyNywidGVhbUlkIjoiNi0yIiwiaWF0IjoxNzE5NDE0NDM0LCJpc3MiOiJzcC10YXNraWZ5In0.JRAWWvLmLkWJQRHJPX1ii6RrW7W8Q9tyRk5ENeFUz5A";

  const dashboardConfig: AxiosRequestConfig = {
    url: `/dashboards/${dashboardid}`,
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
    `dashboardData-${dashboardid}`,
    dashboardConfig,
  );

  if (dashboardLoading) {
    return <div>로딩 중...</div>;
  }

  if (dashboardError || !dashboardData) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
  }

  return (
    <DashboardLayout
      title={`${dashboardData.title}`}
      dashboardid={dashboardid as string}
      showActionButton={true}
      showBadgeCounter={true}
      showProfileDropdown={true}
    >
      <div>
        <h1>대시보드</h1>
        {/* 대시보드 페이지 본문 */}
      </div>
    </DashboardLayout>
  );
};

export default DashboardEditPage;
