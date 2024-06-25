/* 
MyDashboard 내비게이션 컴포넌트: API 연결해야 함
 */
import { FC } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import NavbarTitle from "@/components/Gnb/NavbarTitle/NavbarTitle";
import ActionButton from "@/components/Gnb/ActionButton/ActionButton";
import BadgeCounter from "@/components/Gnb/BadgeCounter/BadgeCounter";
import ProfileDropdown from "@/components/Gnb/Dropdown/ProfileDropdown";
import { useRouter } from "next/router";
import {
  UserData,
  mockUserData,
  DashboardDetail,
  mockDashboardDetail,
} from "@/components/Gnb/MockData";

const fetchUserData = async (): Promise<UserData> => {
  // 현재 코드는 실제 API 호출을 대신하여 mock 데이터를 반환 - 추후 Data fetch 예정
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUserData);
    }, 1000);
  });
};

const MyDashboard: FC = () => {
  const { data, error, isLoading } = useQuery<UserData>({
    queryKey: ["userData"],
    queryFn: fetchUserData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
  }

  const profileInitial = data?.nickname.charAt(0) ?? "";

  return (
    <>
      <div className='h-16 content-center border-b border-gray-30 p-4 tablet:h-20 desktop:h-20'>
        <div className='flex items-center justify-between'>
          <NavbarTitle
            title={mockDashboardDetail.title}
            createdByMe={mockDashboardDetail.createdByMe}
          />

          {/*Nav 우측: 버튼(관리, 초대하기) + 계정 프로필 (뱃지, 이름)*/}
          <div className='ml-auto mr-2 flex items-center justify-end space-x-8 text-sm tablet:mr-10 tablet:text-base desktop:mr-20 desktop:text-base'>
            <div className='flex space-x-8 whitespace-nowrap font-medium text-gray-50'>
              <ActionButton label='관리' iconSrc='/icon/ic_setting.svg' />
              <ActionButton label='초대하기' iconSrc='/icon/ic_add.svg' />
            </div>

            <BadgeCounter />

            <span className='font-bold'>|</span>

            <ProfileDropdown
              nickname={data.nickname}
              profileInitial={profileInitial}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyDashboard;
