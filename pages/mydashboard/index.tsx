import DashboardLayout from "@/components/Layout/DashboardLayout";

export default function MyDashBoard() {
  return (
    <>
      <DashboardLayout
        title='내 대시보드'
        showActionButton={false}
        showBadgeCounter={false}
        showProfileDropdown={true}
        showCreatedByMeIcon={false}
      >
        <div>{/* MyDashboardPage의 콘텐츠 */}</div>
      </DashboardLayout>
    </>
  );
}
