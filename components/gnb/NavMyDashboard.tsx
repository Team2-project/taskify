/* MyDashboard 내비게이션 컴포넌트: UI만 완성

- MyDashboard 페이지에서 사용하는 내비게이션
- 관리버튼
- 초대하기 모달창
- 프로필 클릭시 드롭다운
 */
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import UserBadge from "@/components/gnb/userbadge/UserBadge";
import DropdownMenu from "@/components/gnb/dropdown/DropdownMenu";

//User data type 정의
type UserData = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

//Mock user data
const mockUserData: UserData = {
  id: 0,
  email: "test@example.com",
  nickname: "배유철",
  profileImageUrl:
    "https://item.kakaocdn.net/do/87a69128f299762e65fdbf5c9bcaa70e7154249a3890514a43687a85e6b6cc82",
  createdAt: "2024-06-23T10:39:04.348Z",
  updatedAt: "2024-06-23T10:39:04.348Z",
};

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

  if (error) {
    return <div>Error loading data</div>;
  }

  const profileInitial = data?.nickname.charAt(0) ?? "";

  return (
    <>
      <div className='h-16 content-center border-b border-gray-30 p-4 tablet:h-20 desktop:h-20'>
        <div className='flex items-center justify-between'>
          {/*Nav 좌측*/}
          <Link href='/mydashboard'>
            <div className='flex hidden desktop:ml-80 desktop:inline desktop:content-start desktop:text-xl desktop:font-bold'>
              내 대시보드
            </div>
          </Link>

          {/*Nav 우측: 관리 + 초대하기 + 프로필 + 이름*/}
          <div className='ml-auto mr-2 flex items-center justify-end space-x-8 text-sm tablet:mr-10 tablet:text-base desktop:mr-20 desktop:text-base'>
            {/*관리 + 초대하기 */}
            <div className='flex space-x-8 whitespace-nowrap font-medium text-gray-50'>
              {/*관리 버튼 - 동적 라우팅 추가하면 에러나서 우선 링크 해제합니다. Link href={`/dashboard/${dashboardid}/edit */}
              <button
                className='relative inline-flex items-center justify-center rounded-lg border border-gray-30 p-3 tablet:p-4 desktop:p-4'
                style={{ height: "40px" }}
              >
                <div className='hidden tablet:inline-block desktop:inline-block'>
                  <Image
                    src='icon/ic_setting.svg'
                    alt='setting'
                    width={20}
                    height={20}
                    className='mr-2'
                  />
                </div>
                관리
              </button>
              {/*초대하기 버튼 - 모달창 연결 */}
              <button
                className='relative inline-flex items-center justify-center rounded-lg border border-gray-30 p-3 tablet:p-4 desktop:p-4'
                style={{ height: "40px" }}
              >
                <div className='hidden tablet:inline-block desktop:inline-block'>
                  <Image
                    src='icon/ic_add.svg'
                    alt='setting'
                    width={20}
                    height={20}
                    className='mr-2'
                  />
                </div>
                초대하기
              </button>
            </div>

            <span className='font-bold'>|</span>

            {/*프로필 + 이름 - 드롭다운 연결: 로그아웃, 내정보, 내 대시보드*/}
            <DropdownMenu
              buttonLabel={
                <div className='flex items-center space-x-8'>
                  <div className='relative inline-block'>
                    <UserBadge
                      nickname={profileInitial}
                      bgColor='bg-green-10'
                    />
                  </div>
                  <div className='hidden font-medium tablet:inline desktop:inline'>
                    {data?.nickname}
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyDashboard;
