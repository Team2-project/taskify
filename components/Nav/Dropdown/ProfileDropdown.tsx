import { FC } from "react";
import UserBadge from "@/components/Nav/UserBadge/UserBadge";
import DropdownMenu from "@/components/Nav/Dropdown/DropdownMenu";

interface ProfileDropdownProps {
  nickname: string;
  profileInitial: string;
}

const ProfileDropdown: FC<ProfileDropdownProps> = ({
  nickname,
  profileInitial,
}) => {
  return (
    <DropdownMenu
      buttonLabel={
        <div className='flex items-center space-x-3'>
          <div className='relative inline-block'>
            <UserBadge
              nickname={profileInitial}
              bgColor='bg-green-10'
              textColor='text-white'
            />
          </div>
          <div className='hidden font-medium tablet:inline desktop:inline'>
            {nickname}
          </div>
        </div>
      }
    />
  );
};

export default ProfileDropdown;
