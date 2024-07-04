/*
my dashboard에서 member들 보여주는 카운터
*/
import { FC } from "react";
import UserBadge from "@/components/UserBadge";
import { useAtom } from "jotai";
import { membersAtom } from "@/atoms/membersAtom";
import useMaxDisplayCount from "./useMaxDisplayCount";
import useFetchMembers from "@/hooks/useFetchMembers";

const BadgeCounter: FC<{ dashboardId: number }> = ({ dashboardId }) => {
  const [members] = useAtom(membersAtom);

  useFetchMembers(dashboardId); // 멤버 목록 데이터 가져오기

  const maxDisplayCount = useMaxDisplayCount();
  const bgColorOptions = [
    "bg-orange-10",
    "bg-yellow",
    "bg-blue-10",
    "bg-sand",
    "bg-red-10",
  ];

  return (
    <div className='flex space-x-[-10px]'>
      {members.slice(0, maxDisplayCount).map((member, index) => (
        <UserBadge
          key={member.id}
          nickname={member.nickname}
          profileImageUrl={member.profileImageUrl}
          bgColor={bgColorOptions[index % bgColorOptions.length]}
          textColor='text-white'
          className='h-[34px] w-[34px] tablet:h-[38px] tablet:w-[38px] desktop:h-[38px] desktop:w-[38px]'
        />
      ))}
      {members.length > maxDisplayCount && (
        <UserBadge
          key={members[maxDisplayCount].id}
          customValue={`+${members.length - maxDisplayCount}`}
          bgColor='bg-red-10'
          textColor='text-red-20'
          className='h-[34px] w-[34px] tablet:h-[38px] tablet:w-[38px] desktop:h-[38px] desktop:w-[38px]'
        />
      )}
    </div>
  );
};

export default BadgeCounter;
