import { useRouter } from "next/router";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useAPI } from "@/hooks/useAPI";
import { AxiosRequestConfig } from "axios";
import { DashboardDetailResponse } from "@/lib/api/types/dashboards";

const DashboardEditPage = () => {
  const router = useRouter();
  const { dashboardId } = router.query;

  if (!dashboardId || Array.isArray(dashboardId)) {
    return <div>유효하지 않은 대시보드 ID</div>;
  }

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

  if (dashboardLoading) {
    return <div>로딩 중...</div>;
  }

  if (dashboardError || !dashboardData) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
  }

  return (
    <DashboardLayout
      title={`${dashboardData.title}`}
      dashboardId={dashboardId as string}
      showActionButton={true}
      showBadgeCounter={true}
      showProfileDropdown={true}
    >
      <div>
        <h1>대시보드 편집</h1>
        {/* 편집할 대시보드 데이터 표시 */}
      </div>
    </DashboardLayout>
  );
};

export default DashboardEditPage;
