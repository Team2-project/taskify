/*
  Navbar의 우측 상단, 프로필 사진과 user의 nickname이 보이는 dropdown menu로, 내 정보, 내 대시보드, 로그아웃 기능에 접근 가능함
*/

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import UserBadge from "../../UserBadge";
import DropdownMenu from "./DropdownMenu";
import fetcher from "@/lib/api/fetcher";
import { User } from "@/lib/api/types/users";

const fetchUser = async () => {
  const response = await fetcher<User>({
    url: "/users/me",
    method: "GET",
  });
  return response;
};

const ProfileDropdown: FC = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !user) {
    return null;
  }

  return (
    <DropdownMenu
      buttonLabel={
        <div className='flex items-center space-x-3'>
          <div className='relative inline-block'>
            <UserBadge
              nickname={user.nickname.charAt(0)} // 닉네임의 첫 글자 사용
              profileImageUrl={user.profileImageUrl ?? undefined}
              bgColor='bg-green-10'
              textColor='text-white'
              className='h-[34px] w-[34px] tablet:h-[38px] tablet:w-[38px] desktop:h-[38px] desktop:w-[38px]'
            />
          </div>
          <div className='hidden font-medium tablet:inline desktop:inline'>
            {user.nickname}
          </div>
        </div>
      }
    />
  );
};

export default ProfileDropdown;
