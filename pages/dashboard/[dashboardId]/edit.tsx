import { useRouter } from "next/router";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import ChangeCard from "@/components/DashBoardEdit/ChangeCard";
import BackLink from "@/components/MyPage/BackLink";

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
      <div className='p-[12px] tablet:p-[20]'>
        <BackLink href={`/dashboard/${dashboardId}`} label='돌아가기' />
        <div className='gap-[11px] tablet:gap-3'>
          <ChangeCard />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardEditPage;
