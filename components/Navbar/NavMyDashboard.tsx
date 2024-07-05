/* 
NavMyDashboard: Dashboard 내비게이션 컴포넌트
- Data는 DashboardLayout에서 Props로 받아옵니다
 */

import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavbarTitle from "./NavbarTitle";
import ActionButton from "./ActionButton";
import BadgeCounter from "./BadgeCounter";
import ProfileDropdown from "./Dropdown/ProfileDropdown";
import InvitationModal from "../DashBoardEdit/InvitationModal";
import { DashboardDetailResponse } from "@/lib/api/types/dashboards";

interface NavMyDashboardProps {
  dashboardData:
    | DashboardDetailResponse
    | { title: string; createdByMe: boolean };
  showCreatedByMeIcon?: boolean;
  showActionButton?: boolean;
  showBadgeCounter?: boolean;
  showProfileDropdown?: boolean;
  dashboardId?: number; // 추가(BadgeCounter로전달)
}

const NavMyDashboard: FC<NavMyDashboardProps> = ({
  dashboardData,
  showCreatedByMeIcon = true,
  showActionButton = true,
  showBadgeCounter = true,
  showProfileDropdown = true,
  dashboardId, // 추가
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const [isEditPage, setIsEditPage] = useState(false);

  useEffect(() => {
    setIsEditPage(router.pathname.includes("/edit"));
  }, [router.pathname]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleManageClick = () => {
    if (dashboardId) {
      router.push(`/dashboard/${dashboardId}/edit`);
    }
  };

  const { title, createdByMe } = dashboardData;

  return (
    <nav className='h-[60px] content-center border-b border-gray-30 bg-white p-4 tablet:h-[70px] desktop:h-[80px]'>
      <div className='flex items-center justify-between'>
        <NavbarTitle
          title={title}
          createdByMe={showCreatedByMeIcon && createdByMe}
        />

        <div className='ml-auto mr-2 flex items-center justify-end space-x-4 text-sm tablet:mr-10 tablet:space-x-8 tablet:text-base desktop:mr-20 desktop:space-x-10 desktop:text-base'>
          <div className='flex space-x-2 whitespace-nowrap font-medium text-gray-50 tablet:space-x-3 desktop:space-x-8'>
            {showActionButton && createdByMe && (
              <>
                <ActionButton
                  label='관리'
                  iconSrc='/icon/ic_setting.svg'
                  onClick={handleManageClick}
                  className={isEditPage ? "pointer-events-none opacity-50" : ""} // 관리 페이지에서 흐릿하게 보이도록 설정
                />
                <ActionButton
                  label='초대하기'
                  iconSrc='/icon/ic_add_dashboard.svg'
                  onClick={handleOpenModal}
                />
              </>
            )}
          </div>

          {showProfileDropdown && (
            <div className='flex items-center space-x-3 tablet:space-x-6 desktop:space-x-8'>
              {showBadgeCounter && dashboardId && (
                <BadgeCounter dashboardId={dashboardId} />
              )}
              <span className='font-bold'>|</span>
              <ProfileDropdown />
            </div>
          )}
        </div>
      </div>
      <InvitationModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </nav>
  );
};

export default NavMyDashboard;
