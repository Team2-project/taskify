import { FC } from "react";
import UserBadge from "../../UserBadge";
import DropdownMenu from "./DropdownMenu";

interface ProfileDropdownProps {
  nickname: string;
  profileInitial: string;
  profileImageUrl?: string;
}

const ProfileDropdown: FC<ProfileDropdownProps> = ({
  nickname,
  profileInitial,
  profileImageUrl,
}) => {
  return (
    <DropdownMenu
      buttonLabel={
        <div className='flex items-center space-x-3'>
          <div className='relative inline-block'>
            <UserBadge
              nickname={profileInitial}
              profileImageUrl={profileImageUrl}
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
