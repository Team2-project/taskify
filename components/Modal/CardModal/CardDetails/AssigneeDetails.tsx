import React from "react";
import UserBadge from "@/components/UserBadge";
import { FetchCardDetailsResponse } from "@/lib/api/types/cards";
import { format } from "date-fns";

interface AssigneeDetailsProps {
  cardDetails: FetchCardDetailsResponse;
}

const AssigneeDetails: React.FC<AssigneeDetailsProps> = ({ cardDetails }) => {
  const { assignee, dueDate } = cardDetails;
  const formattedDueDate = format(new Date(dueDate), "yyyy.MM.dd hh:mm");

  return (
    <div className='rounded-[8px] border border-gray-30 px-[16px] py-[20px]'>
      <div className='grid grid-cols-2 gap-4'>
        <span className='text-sm font-semibold'>담당자</span>
        <span className='text-sm font-semibold'>마감일</span>
        <div className='relative'>
          <UserBadge
            nickname={assignee.nickname}
            profileImageUrl={assignee.profileImageUrl ?? undefined}
            bgColor='bg-green-10'
            textColor='text-white'
            className='absolute top-[-10px] h-[40px] w-[40px]'
          />
          <span className='ml-12 text-base'>{assignee.nickname}</span>
        </div>
        <span className='self-end text-base'>{formattedDueDate}</span>
      </div>
    </div>
  );
};

export default AssigneeDetails;
