import { useState, ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardInvitationsResponse } from "@/lib/api/types/dashboards";
import fetcher from "@/lib/api/fetcher";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ReactSVG } from "react-svg";
import Image from "next/image";

// 초대받은 대시보드가 없는 경우 적용
function NoInvitations() {
  return (
    <div className='ml-[14px] h-[400px] w-[260px] rounded-md bg-white px-[16px] py-[24px] tablet:ml-[40px] tablet:w-[504px] tablet:px-[28px] tablet:py-[32px] desktop:w-[1022px]'>
      <h1 className='mb-[105px] text-[20px] font-bold tablet:mb-[67px] tablet:text-[24px]'>
        초대받은 대시보드
      </h1>
      <Image
        className='mx-auto tablet:h-[100px] tablet:w-[100px]'
        src='/icon/ic_message_x.svg'
        alt='message_x'
        width={60}
        height={60}
      />
      <h2 className='mx-auto text-center text-[14px] text-gray-40 tablet:text-[18px]'>
        아직 초대받은 대시보드가 없어요
      </h2>
    </div>
  );
}

export default function InvitedDashboard() {
  const [searchTitle, setSearchTitle] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
  };

  const config: AxiosRequestConfig = {
    url: `/dashboards/10114/invitations`, // dashboardId 무엇을 넣어야할지..
    method: "GET",
    params: { dashboardId: "10114" }, // dashboardId 무엇을 넣어야할지..
  };

  const {
    data: invitationData,
    error: invitationError,
    isLoading: invitationLoading,
  } = useQuery<DashboardInvitationsResponse>({
    queryKey: ["DashboardInvitationsResponse"],
    queryFn: () => fetcher<DashboardInvitationsResponse>(config),
  });

  if (invitationLoading) {
    return <div>Loading...</div>;
  }
  if (invitationError || !invitationData) {
    return null;
  }

  const invitationArray = invitationData.invitations;

  const Invitations = () => {
    return invitationArray.map((invitation) => (
      <tr
        key={invitation.id}
        className='border-b-[1px] border-gray-30 tablet:h-[70px]'
      >
        <td className='text-[14px] text-black-20 tablet:text-[16px]'>
          <p className='text-[14px] text-gray-40 tablet:hidden'>이름</p>
          {invitation.dashboard.title}
        </td>
        <td className='text-[14px] text-black-20 tablet:text-[16px]'>
          <p className='text-[14px] text-gray-40 tablet:hidden'>초대자</p>
          {invitation.inviter.nickname}
        </td>
        <td>
          <div className='flex gap-[10px]'>
            <button className='h-[28px] w-[108px] rounded-[4px] bg-violet-20 px-[37px] py-[7px] text-[12px] font-medium text-white tablet:h-[30px] tablet:w-[72px] tablet:px-[20px] tablet:py-[6px] desktop:h-[32px] desktop:w-[84px] desktop:px-[23px] desktop:py-[7px]'>
              수락
            </button>
            <button className='h-[28px] w-[108px] rounded-[4px] border-[1px] border-gray-30 px-[37px] py-[7px] text-[12px] font-medium text-violet-20 tablet:h-[30px] tablet:w-[72px] tablet:px-[20px] tablet:py-[6px] desktop:h-[32px] desktop:w-[84px] desktop:px-[23px] desktop:py-[7px]'>
              거절
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      {invitationArray.length === 0 ? (
        <NoInvitations />
      ) : (
        <section className='mx-[16px] my-[24px] box-border w-full max-w-[1022px] rounded-md bg-white px-[16px]'>
          <h2 className='px-[16px] py-[24px] text-[20px] font-bold tablet:text-[24px]'>
            초대받은 대시보드
          </h2>
          <table className='box-border w-full'>
            <colgroup className='hidden'>
              <col />
              <col />
              <col />
            </colgroup>
            <thead className='mb-[30px]'>
              <tr>
                <th colSpan={3}>
                  <form className='relative mb-[24px] flex items-center'>
                    <button className='absolute mx-[5px]'>
                      <ReactSVG
                        src='/icon/ic_search.svg'
                        width={15}
                        height={15}
                      />
                    </button>
                    <input
                      className='h-[36px] w-full rounded-md border border-gray-30 pl-[27px] text-[14px] font-normal tablet:h-[40px]'
                      id='title'
                      placeholder='검색'
                      type='text'
                      value={searchTitle}
                      onChange={handleInputChange}
                    />
                  </form>
                </th>
              </tr>
              <tr className='hidden w-full tablet:contents tablet:text-[16px] tablet:font-normal tablet:text-gray-40'>
                <td className='border-b-[30px] border-white'>이름</td>
                <td className='border-b-[30px] border-white'>초대자</td>
                <td className='border-b-[30px] border-white'>수락 여부</td>
              </tr>
            </thead>
            <tbody>
              <Invitations />
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
