import { useRouter } from "next/router";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useAPI } from "@/hooks/useAPI";
import { AxiosRequestConfig } from "axios";
import { DashboardDetailResponse } from "@/lib/api/types/dashboards";

const DashboardPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAyNywidGVhbUlkIjoiNi0yIiwiaWF0IjoxNzE5NDE0NDM0LCJpc3MiOiJzcC10YXNraWZ5In0.JRAWWvLmLkWJQRHJPX1ii6RrW7W8Q9tyRk5ENeFUz5A";

  const dashboardConfig: AxiosRequestConfig = {
    url: `/dashboards/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const {
    data: dashboardData,
    error: dashboardError,
    isLoading: dashboardLoading,
  } = useAPI<DashboardDetailResponse>("dashboardData", dashboardConfig);

  if (dashboardLoading) {
    return <div>Loading...</div>;
  }

  if (dashboardError || !dashboardData) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
  }

  return (
    <DashboardLayout
      title={dashboardData.title}
      showActionButton={true}
      showBadgeCounter={true}
      showProfileDropdown={true}
    >
      <div>{/* DashboardPage의 콘텐츠 */}</div>
    </DashboardLayout>
  );
};

export default DashboardPage;
