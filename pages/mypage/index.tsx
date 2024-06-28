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
      <div>layout설정해서 contents 올바른 위치에 두자!</div>
    </DashboardLayout>
  );
};

export default MyPage;
