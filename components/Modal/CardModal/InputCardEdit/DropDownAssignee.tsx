import { useState } from "react";
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
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [selectedMemberNickname, setSelectedMemberNickname] = useState<string>(
    placeholder || "",
  );
  const [dropOpen, setDropOpen] = useState<boolean>(false);

  const handleMemberSelect = (memberId: number, memberNickname: string) => {
    setSelectedMemberId(memberId);
    setSelectedMemberNickname(memberNickname);
    setDropOpen(false);
    if (onMemberSelect) {
      onMemberSelect(memberId, memberNickname);
    }
  };

  const handleConfirm = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedMemberId !== null && onMemberSelect) {
      onMemberSelect(selectedMemberId, selectedMemberNickname);
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
          type='button'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDropOpen((prev) => !prev);
          }}
          className='flex w-full items-center justify-between'
        >
          <div className='text-[14px] font-normal tablet:text-[16px]'>
            {selectedMemberNickname}
          </div>
          {dropOpen ? dropButton.open : dropButton.close}
        </button>
        {dropOpen && (
          <div className='absolute left-0 right-0 top-full z-[10] rounded-b-[6px] border border-gray-20 bg-white shadow-lg'>
            <ul>
              {membersData.map((member) => (
                <li
                  key={member.id}
                  className={`hover:bg-gray-100 cursor-pointer px-4 py-2 ${member.id === selectedMemberId ? "bg-gray-100" : ""}`}
                  onClick={() => handleMemberSelect(member.id, member.nickname)}
                >
                  {member.nickname}
                </li>
              ))}
              <li
                className='hover:bg-gray-100 cursor-pointer px-4 py-2'
                onClick={handleConfirm}
              >
                Confirm
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
