import { useState, useEffect } from "react";
import { dropButton } from "../list";

interface DropDownProps {
  subTitle: string;
  placeholder?: string;
  dashboardId?: number;
  membersData?: { id: number; nickname: string; profileImageUrl: string }[];
  onMemberSelect?: (memberId: number) => void;
}

export default function DropDown({
  subTitle,
  placeholder,
  dashboardId,
  membersData = [],
  onMemberSelect,
}: DropDownProps) {
  const [dropOpen, setDropOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log("membersData:", membersData); // 전달된 membersData를 콘솔에 출력하여 확인
  }, [membersData]);

  const handleMemberSelect = (memberId: number) => {
    if (onMemberSelect) {
      onMemberSelect(memberId);
    }
    setDropOpen(false);
  };

  return (
    <div className='mt-[18px] flex w-full flex-col gap-[10px] tablet:mt-[26px]'>
      <div className='text-[16px] font-medium tablet:text-[18px]'>
        {subTitle}
      </div>
      <div className='relative flex h-[42px] w-full items-center rounded-[6px] border-[1px] border-gray-30 p-4 active:border-[1px] active:border-violet-20 tablet:h-[48px]'>
        <button
          onClick={() => setDropOpen((prev) => !prev)}
          className='flex w-full items-center justify-between'
        >
          <div className='text-[14px] font-normal text-gray-40 tablet:text-[16]'>
            {placeholder}
          </div>
          {dashboardId != null
            ? dropOpen
              ? dropButton.open
              : dropButton.close
            : null}
        </button>
        {dropOpen && (
          <div className='absolute left-0 right-0 top-full z-[10] rounded-b-[6px] border border-gray-20 bg-white shadow-lg'>
            <ul>
              {membersData.map((member) => (
                <li
                  key={member.id}
                  className='hover:bg-gray-100 cursor-pointer px-4 py-2'
                  onClick={() => handleMemberSelect(member.id)}
                >
                  {member.nickname}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
