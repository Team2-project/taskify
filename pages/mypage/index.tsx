import { FC } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";

const MyPage: FC = () => {
  return (
    <DashboardLayout
      title='계정관리'
      showActionButton={false}
      showBadgeCounter={false}
      showProfileDropdown={true}
      showCreatedByMeIcon={false}
    >
      <div>{/* MyPage의 콘텐츠 */}</div>
    </DashboardLayout>
  );
};

export default MyPage;
