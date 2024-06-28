/* 
NavMyDashboard: Dashboard 내비게이션 컴포넌트: API 연결 추후 수정 예정
 */
import { FC } from "react";
import { AxiosRequestConfig } from "axios";
import { useQuery } from "@tanstack/react-query";
import fetcher from "@/lib/api/fetcher";
import NavbarTitle from "./NavbarTitle";
import ActionButton from "./ActionButton";
import BadgeCounter from "./BadgeCounter";
import ProfileDropdown from "./Dropdown/ProfileDropdown";
import { User } from "@/lib/api/types/users";
import { DashboardDetailResponse } from "@/lib/api/types/dashboards";

interface NavMyDashboardProps {
  title: string;
  showActionButton?: boolean;
  showBadgeCounter?: boolean;
  showProfileDropdown?: boolean;
}

const NavMyDashboard: FC<NavMyDashboardProps> = ({
  title,
  showActionButton = true,
  showBadgeCounter = true,
  showProfileDropdown = true,
}) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAyNywidGVhbUlkIjoiNi0yIiwiaWF0IjoxNzE5NDE0NDM0LCJpc3MiOiJzcC10YXNraWZ5In0.JRAWWvLmLkWJQRHJPX1ii6RrW7W8Q9tyRk5ENeFUz5A";

  const userConfig: AxiosRequestConfig = {
    url: "/users/me",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const dashboardConfig: AxiosRequestConfig = {
    url: "/dashboards/9807",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useQuery<User>({
    queryKey: ["userData"],
    queryFn: () => fetcher<User>(userConfig),
  });

  const {
    data: dashboardData,
    error: dashboardError,
    isLoading: dashboardLoading,
  } = useQuery<DashboardDetailResponse>({
    queryKey: ["dashboardData"],
    queryFn: () => fetcher<DashboardDetailResponse>(dashboardConfig),
  });

  if (userLoading || dashboardLoading) {
    return <div>Loading...</div>;
  }

  if (userError || dashboardError || !userData || !dashboardData) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
  }

  const profileInitial = userData.nickname.charAt(0) ?? "";

  return (
    <div className='h-[60px] content-center border-b border-gray-30 bg-white p-4 tablet:h-[70px] desktop:h-[80px]'>
      <div className='flex items-center justify-between'>
        <NavbarTitle title={title} createdByMe={false} />

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
