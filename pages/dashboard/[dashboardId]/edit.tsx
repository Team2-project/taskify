import { useRouter } from "next/router";
import DashboardLayout from "@/components/Layout/DashboardLayout";

const DashboardEditPage = () => {
  const router = useRouter();
  const { dashboardId } = router.query;

  if (!dashboardId || Array.isArray(dashboardId)) {
    return <div>유효하지 않은 대시보드 ID</div>;
  }

  return (
    <DashboardLayout
      dashboardId={dashboardId as string}
      showActionButton={true}
      showBadgeCounter={true}
      showProfileDropdown={true}
    >
      <div>
        <div className='h-[150px]'></div>
        <h1 className='text-center'>대시보드 Edit 페이지</h1>
        {/* 대시보드 Edit 데이터 표시 */}
      </div>
    </DashboardLayout>
  );
};

export default DashboardEditPage;
