/*
DashboardLayout: MyPage, Dashboard, MyDashboard에 적용하는 Layout
*/

import { FC, ReactNode, useEffect } from "react";
import { useAtom } from "jotai";
import NavMyDashboard from "@/components/Navbar/NavMyDashboard";
import SideMenu from "@/components/SideMenu/SideMenu";
import fetcher from "@/lib/api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { User } from "@/lib/api/types/users";
import { userAtom } from "@/atoms/userAtom";
import { membersAtom } from "@/atoms/membersAtom";
import { DashboardDetailResponse } from "@/lib/api/types/dashboards";
import { MembersResponse } from "@/lib/api/types/members";
import useFetchMembers from "@/hooks/useFetchMembers";

interface DashboardLayoutProps {
  children: ReactNode;
  userData?: User;
  title?: string;
  dashboardId?: number;
  showActionButton?: boolean;
  showBadgeCounter?: boolean;
  showProfileDropdown?: boolean;
  showCreatedByMeIcon?: boolean;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  title,
  dashboardId,
  showActionButton = true,
  showBadgeCounter = true,
  showProfileDropdown = true,
  showCreatedByMeIcon = true,
}) => {
  const userConfig: AxiosRequestConfig = {
    url: "/users/me",
    method: "GET",
  };

  const dashboardConfig: AxiosRequestConfig = {
    url: `/dashboards/${dashboardId}`,
    method: "GET",
  };

  // Jotai의 useAtom 훅을 사용하여 userData를 atom에 저장
  const [userData, setUserData] = useAtom(userAtom);
  const [membersData, setMembersData] = useAtom(membersAtom);

  const {
    data: fetchedUserData,
    error: userError,
    isLoading: userLoading,
  } = useQuery<User>({
    queryKey: ["userData"],
    queryFn: () => fetcher<User>(userConfig),
  });

  const {
    data: fetchedMembersData,
    error: membersError,
    isLoading: membersLoading,
  } = useFetchMembers(dashboardId || 0);

  useEffect(() => {
    if (fetchedUserData) {
      setUserData(fetchedUserData);
    }
  }, [fetchedUserData, setUserData]);

  useEffect(() => {
    if (fetchedMembersData) {
      setMembersData(fetchedMembersData.members);
    }
  }, [fetchedMembersData, setMembersData]);

  const {
    data: dashboardData,
    error: dashboardError,
    isLoading: dashboardLoading,
  } = useQuery<DashboardDetailResponse>({
    queryKey: ["dashboardData", dashboardId],
    queryFn: () => fetcher<DashboardDetailResponse>(dashboardConfig),
    enabled: !!dashboardId,
  });

  if (userLoading || (dashboardId && dashboardLoading)) {
    return <div>Loading...</div>;
  }

  if (
    userError ||
    (dashboardId && dashboardError) ||
    !userData ||
    (dashboardId && !dashboardData)
  ) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
  }

  const DashboardTitle = title || (dashboardData ? dashboardData.title : "");
  const createdByMe = dashboardData ? dashboardData.createdByMe : false;

  return (
    <div>
      <div className='flex h-screen flex-col'>
        <NavMyDashboard
          showActionButton={showActionButton}
          showBadgeCounter={showBadgeCounter}
          showProfileDropdown={showProfileDropdown}
          userData={userData}
          dashboardData={
            dashboardData
              ? { ...dashboardData, title: DashboardTitle, createdByMe }
              : { title: DashboardTitle, createdByMe }
          }
          showCreatedByMeIcon={showCreatedByMeIcon}
          dashboardId={dashboardId} // dashboardID (BadgeCounter로) 전달
        />
        <div className='flex flex-1 overflow-hidden'>
          <div className='flex-shrink-0'>
            <SideMenu />
          </div>
          <div className='ml-[300px] flex-1 overflow-auto max-desktop:ml-[160px] max-tablet:ml-[67px]'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
