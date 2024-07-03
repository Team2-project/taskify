import { useState, useEffect } from "react";
import { dropButton } from "../list";

interface DropDownProps {
  subTitle: string;
  placeholder?: string;
  dashboardId?: number;
  membersData?: { id: number; nickname: string; profileImageUrl: string }[];
  onMemberSelect?: (memberId: number, memberNickname: string) => void;
}

export default function DropDownAssignee({
  subTitle,
  placeholder,
  dashboardId,
  membersData = [],
  onMemberSelect,
}: DropDownProps) {
  const [dropOpen, setDropOpen] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<string>(
    placeholder || "",
  );

  useEffect(() => {
    setSelectedMember(placeholder || "");
  }, [placeholder]);

  const handleMemberSelect = (memberId: number, memberNickname: string) => {
    setSelectedMember(memberNickname);
    if (onMemberSelect) {
      onMemberSelect(memberId, memberNickname);
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
          <div className='text-[14px] font-normal tablet:text-[16px]'>
            {selectedMember}
          </div>
          {dropOpen ? dropButton.open : dropButton.close}
        </button>
        {dropOpen && (
          <div className='absolute left-0 right-0 top-full z-[10] rounded-b-[6px] border border-gray-20 bg-white shadow-lg'>
            <ul>
              {membersData.map((member) => (
                <li
                  key={member.id}
                  className='hover:bg-gray-100 cursor-pointer px-4 py-2'
                  onClick={() => handleMemberSelect(member.id, member.nickname)}
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
