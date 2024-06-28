/*
my dashboard에서 member들 보여주는 카운터
우선 MockData와 연결
*/
import { FC } from "react";
import UserBadge from "@/components/Navbar/UserBadge/UserBadge";
import { mockMembersData } from "../MockData";
import useMaxDisplayCount from "./useMaxDisplayCount";

const BadgeCounter: FC = () => {
  const { members, totalCount } = mockMembersData;
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
      {/* maxDisplayCount까지만 badge display */}
      {members.slice(0, maxDisplayCount).map((member, index) => (
        <UserBadge
          key={member.id}
          nickname={member.nickname}
          bgColor={bgColorOptions[index % bgColorOptions.length]}
          textColor='text-white'
        />
      ))}
      {/* MaxDisplayCount이상일 경우 나머지 인원 +숫자로 표기 */}
      {totalCount > maxDisplayCount && (
        <UserBadge
          key={members[maxDisplayCount].id}
          customValue={`+${totalCount - maxDisplayCount}`}
          bgColor='bg-red-10'
          textColor='text-red-20'
        />
      )}
    </div>
  );
};

export default BadgeCounter;
