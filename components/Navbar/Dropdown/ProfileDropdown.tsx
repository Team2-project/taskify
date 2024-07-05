/*
  Navbar의 우측 상단, 프로필 사진과 user의 nickname이 보이는 dropdown menu로, 내 정보, 내 대시보드, 로그아웃 기능에 접근 가능함
*/

import { FC } from "react";
import { useAtom } from "jotai";
import UserBadge from "../../UserBadge";
import DropdownMenu from "./DropdownMenu";
import { userAtom } from "@/atoms/userAtom";

const ProfileDropdown: FC = () => {
  const [user] = useAtom(userAtom);

  if (!user) {
    return null; // 사용자 정보가 없으면 아무것도 렌더링하지 않음
  }

  return (
    <DropdownMenu
      buttonLabel={
        <div className='flex items-center space-x-3'>
          <div className='relative inline-block'>
            <UserBadge
              nickname={user.nickname.charAt(0)} // 프로필의 첫 글자 사용
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
