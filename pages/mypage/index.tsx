import DashboardLayout from "@/components/Layout/DashboardLayout";

const MyPage = () => {
  return (
    <DashboardLayout
      title='계정관리'
      showActionButton={false}
      showBadgeCounter={false}
      showProfileDropdown={true}
    >
      <div>{/* MyPage의 콘텐츠 */}</div>
    </DashboardLayout>
  );
};

export default MyPage;
