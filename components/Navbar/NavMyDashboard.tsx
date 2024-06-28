/* 
NavMyDashboard: Dashboard 내비게이션 컴포넌트
- Data는 DashboardLayout에서 Props로 받아옵니다
 */

import { FC } from "react";
import NavbarTitle from "./NavbarTitle";
import ActionButton from "./ActionButton";
import BadgeCounter from "./BadgeCounter";
import ProfileDropdown from "./Dropdown/ProfileDropdown";
import { User } from "@/lib/api/types/users";
import { DashboardDetailResponse } from "@/lib/api/types/dashboards";

interface NavMyDashboardProps {
  userData: User;
  dashboardData:
    | DashboardDetailResponse
    | { title: string; createdByMe: boolean };
  showCreatedByMeIcon?: boolean;
  showActionButton?: boolean;
  showBadgeCounter?: boolean;
  showProfileDropdown?: boolean;
}

const NavMyDashboard: FC<NavMyDashboardProps> = ({
  userData,
  dashboardData,
  showCreatedByMeIcon = true,
  showActionButton = true,
  showBadgeCounter = true,
  showProfileDropdown = true,
}) => {
  const profileInitial = userData.nickname.charAt(0) ?? "";
  const { title, createdByMe } = dashboardData;

  return (
    <div className='h-[60px] content-center border-b border-gray-30 bg-white p-4 tablet:h-[70px] desktop:h-[80px]'>
      <div className='flex items-center justify-between'>
        <NavbarTitle
          title={title}
          createdByMe={showCreatedByMeIcon && createdByMe}
        />

        <div className='ml-auto mr-2 flex items-center justify-end space-x-4 text-sm tablet:mr-10 tablet:space-x-8 tablet:text-base desktop:mr-20 desktop:space-x-10 desktop:text-base'>
          <div className='flex space-x-2 whitespace-nowrap font-medium text-gray-50 tablet:space-x-3 desktop:space-x-8'>
            {showActionButton && (
              <>
                <ActionButton label='관리' iconSrc='/icon/ic_setting.svg' />
                <ActionButton
                  label='초대하기'
                  iconSrc='/icon/ic_add_dashboard.svg'
                />
              </>
            )}
          </div>

          {showProfileDropdown && (
            <div className='flex items-center space-x-3 tablet:space-x-6 desktop:space-x-8'>
              {showBadgeCounter && <BadgeCounter />}

              <span className='font-bold'>|</span>

              <ProfileDropdown
                nickname={userData.nickname}
                profileInitial={profileInitial}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavMyDashboard;
