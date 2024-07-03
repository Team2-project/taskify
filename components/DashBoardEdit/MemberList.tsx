import React, { useState } from "react";
import UserCard from "./components/UserCard";
import Button from "@/components/Button";
import fetcher from "@/lib/api/fetcher";
import { useRouter } from "next/router";
import { MembersResponse, Member } from "@/lib/api/types/members";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import UserBadge from "@/components/UserBadge";

const MemberList: React.FC = () => {
  const [page, setPage] = useState(1);
  const size = 4;
  const [deletedMembers, setDeletedMembers] = useState<number[]>([]); // 상태 추가: 삭제된 멤버의 ID를 저장

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const router = useRouter();
  const { dashboardId } = router.query;

  const membersConfig: AxiosRequestConfig = {
    url: `/members?page=${page}&size=${size}&dashboardId=${dashboardId}`,
    method: "GET",
  };

  const {
    data: membersData,
    error: membersError,
    isLoading: membersLoading,
    refetch: refetchMembers, // 멤버 목록 다시 불러오기 위한 refetch 함수
  }: UseQueryResult<MembersResponse, Error> = useQuery({
    queryKey: ["membersData", dashboardId, page],
    queryFn: () => fetcher<MembersResponse>(membersConfig),
    enabled: !!dashboardId,
  });

  const handleButtonClick = async (memberId: number) => {
    try {
      await fetcher({
        url: `/members/${memberId}`,
        method: "DELETE",
      });

      console.log(`ID가 ${memberId}인 구성원이 삭제되었습니다.`);
      // 삭제 성공 후 deletedMembers 상태 업데이트
      setDeletedMembers((prevDeleted) => [...prevDeleted, memberId]);
    } catch (error) {
      console.error("구성원 삭제 중 오류가 발생했습니다:", error);
    }
  };

  if (!dashboardId || Array.isArray(dashboardId)) {
    return <div>유효하지 않은 대시보드 ID</div>;
  }

  if (membersLoading) {
    return <div>로딩 중...</div>;
  }

  if (membersError) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
  }

  if (!membersData || !membersData.members) {
    return <div>데이터가 없습니다</div>;
  }

  const totalCount = membersData.totalCount;

  // 삭제된 멤버를 제외한 멤버 리스트 필터링
  const filteredMembers = membersData.members.filter(
    (member) => !deletedMembers.includes(member.id),
  );

  return (
    <div className='h-337 max-w-[620px] bg-white tablet:h-404'>
      <div className='mt-[20px] flex w-full items-center justify-between px-[20px] tablet:px-[28px]'>
        <h2 className='text-xl font-bold tablet:text-2xl'>구성원</h2>
        <div className='flex items-center'>
          <p className='mr-3'>
            {page}페이지 중 {Math.ceil(totalCount / size)}
          </p>
          <Button.Arrow
            direction='left'
            onClick={handlePrevPage}
            disabled={page === 1}
          />
          <Button.Arrow
            direction='right'
            onClick={handleNextPage}
            disabled={page * size >= totalCount}
          />
        </div>
      </div>

      <p className='mb-[20px] ml-[20px] mt-[18px] text-sm font-normal text-gray-40 tablet:mb-[24px] tablet:ml-[28px] tablet:mt-[27px] tablet:text-base'>
        이름
      </p>
      <div className='flex flex-col gap-[24px]'>
        {filteredMembers.map((member) => (
          <UserCard
            key={member.id}
            title={member.nickname}
            buttonLabel='삭제'
            onButtonClick={() => handleButtonClick(member.id)}
          >
            <UserBadge
              nickname={member.nickname}
              profileImageUrl={member.profileImageUrl}
              className='h-34 w-34'
            />
          </UserCard>
        ))}
      </div>
    </div>
  );
};

export default MemberList;
