import { useRouter } from "next/router";
import { AxiosRequestConfig } from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import fetcher from "@/lib/api/fetcher";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { DashboardDetailResponse } from "@/lib/api/types/dashboards";
import DashBoard from "@/components/DashBoard/DashBoard";

const DashboardIdPage = () => {
  const router = useRouter();
  const { dashboardId } = router.query;

  const dashboardConfig: AxiosRequestConfig = {
    url: `/dashboards/${dashboardId}`,
    method: "GET",
  };

  const {
    data: dashboardData,
    error: dashboardError,
    isLoading: dashboardLoading,
  }: UseQueryResult<DashboardDetailResponse, Error> = useQuery({
    queryKey: ["dashboardData", dashboardId],
    queryFn: () => fetcher<DashboardDetailResponse>(dashboardConfig),
    enabled: !!dashboardId,
  });

  if (!dashboardId || Array.isArray(dashboardId)) {
    return <div>유효하지 않은 대시보드 ID</div>;
  }

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
      <div className='desktop:overflow-x-auto desktop:whitespace-nowrap'>
        // 대시보드 컴포넌트를 렌더링하고 생성할때 선택한 색상을 props로 전달
        <DashBoard color={dashboardData.color} />
      </div>
    </DashboardLayout>
  );
};

export default DashboardIdPage;
