import { useState } from "react";
import { useRouter } from "next/router";
import { dropButton } from "../Modal/CardModal/list";
import { MembersResponse } from "@/lib/api/types/members";
import { AxiosRequestConfig } from "axios";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import fetcher from "@/lib/api/fetcher";

interface DropDownProps {
  subTitle: string;
  dropData: string;
  placeholder?: string;
  handleDropClick: (userId: number, nickname: string) => void;
}

export default function DropDown({
  subTitle,
  dropData,
  placeholder,
  handleDropClick,
}: DropDownProps) {
  const router = useRouter();
  const { dashboardId } = router.query;

  const [dropOpen, setDropOpen] = useState<boolean>(false);

  const membersConfig: AxiosRequestConfig = {
    url: `/members?dashboardId=${dashboardId}`,
    method: "GET",
  };

  const {
    data: membersData,
    error: membersError,
    isLoading: membersLoading,
  }: UseQueryResult<MembersResponse, Error> = useQuery({
    queryKey: ["members", dashboardId],
    queryFn: async () => {
      try {
        const response = await fetcher<MembersResponse>(membersConfig);
        return response;
      } catch (error) {
        throw error;
      }
    },
    enabled: !!dashboardId,
  });

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
          {dropData ? (
            <div className='text-[14px] font-normal text-black tablet:text-[16]'>
              {dropData}
            </div>
          ) : (
            <div className='text-[14px] font-normal text-gray-40 tablet:text-[16]'>
              {placeholder}
            </div>
          )}
          {dropOpen ? dropButton.open : dropButton.close}
          {dropOpen && (
            <div className='absolute left-[-1px] top-[45px] z-40 flex w-[287px] flex-col rounded-[6px] border-[1px] border-gray-30 bg-white'>
              {membersData.members.map(
                ({ userId, nickname, profileImageUrl }) => (
                  <button
                    onClick={() => handleDropClick(userId, nickname)}
                    key={userId}
                    className='flex border-b-[1px] border-b-gray-30 p-[14px] text-[14px] hover:font-semibold tablet:text-[16px]'
                  >
                    {profileImageUrl && (
                      <Image
                        width={20}
                        height={20}
                        src={profileImageUrl}
                        alt='프로필이미지'
                      />
                    )}
                    {nickname}
                  </button>
                ),
              )}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

