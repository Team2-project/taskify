/*
my dashboard에서 member들 보여주는 카운터
*/
import { FC, useEffect } from "react";
import UserBadge from "@/components/UserBadge";
import { useAtom } from "jotai";
import { membersAtom } from "@/atoms/membersAtom";
import useMaxDisplayCount from "./useMaxDisplayCount";
import fetcher from "@/lib/api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { MembersResponse } from "@/lib/api/types/members";

const BadgeCounter: FC<{ dashboardId: number }> = ({ dashboardId }) => {
  const [members, setMembers] = useAtom(membersAtom);

  const membersConfig: AxiosRequestConfig = {
    url: `/members`,
    method: "GET",
    params: {
      dashboardId,
    },
  };

  const {
    data: fetchedMembersData,
    error: membersError,
    isLoading: membersLoading,
  } = useQuery<MembersResponse>({
    queryKey: ["membersData", dashboardId],
    queryFn: () => fetcher<MembersResponse>(membersConfig),
  });

  useEffect(() => {
    if (fetchedMembersData) {
      setMembers(fetchedMembersData.members);
    }
  }, [fetchedMembersData, setMembers]);

  const maxDisplayCount = useMaxDisplayCount();
  const bgColorOptions = [
    "bg-orange-10",
    "bg-yellow",
    "bg-blue-10",
    "bg-sand",
    "bg-red-10",
  ];

  if (membersLoading) {
    return <div>로딩 중...</div>;
  }

  if (membersError) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
  }

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
