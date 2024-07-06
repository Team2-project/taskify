import { useState, ChangeEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import fetcher from "@/lib/api/fetcher";
import { AxiosRequestConfig } from "axios";
import { ReactSVG } from "react-svg";
import Image from "next/image";
import {
  InvitationsResponse,
  InvitationResponse,
} from "@/lib/api/types/invitations";
import { useRouter } from "next/router";

// 초대받은 대시보드가 없는 경우
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

  // 거절한 초대 대시보드
  const [deletedInvitations, setDeletedInvitations] = useState<number[]>([]);

  // 수락한 초대 대시보드
  const [addedInvitations, setAddedInvitations] = useState<number[]>([]);

  const router = useRouter();

  const queryClient = useQueryClient();

  // 초대 응답 PUT Request
  const mutation = useMutation({
    mutationFn: async ({
      inviteAccepted,
      invitationId,
    }: {
      inviteAccepted: boolean;
      invitationId: number;
    }) => {
      const response = await fetcher<InvitationResponse>({
        url: `/invitations/${invitationId}`,
        method: "PUT",
        data: { inviteAccepted },
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["InvitationsResponse"],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // 수락 버튼 클릭 -> inviteAccepted: true / 대시보드 목록에 추가
  const handleClickAcceptButton = async (invitationId: number) => {
    try {
      mutation.mutate({ inviteAccepted: true, invitationId });
      setAddedInvitations((prevAdded) => [...prevAdded, invitationId]);
    } catch (error) {
      console.error("수락 오류");
    }
  };

  // 거절 버튼 클릭 -> inviteAccepted: false / 초대 목록에서 사라짐
  const handleClickRefuseButton = async (invitationId: number) => {
    try {
      mutation.mutate({ inviteAccepted: false, invitationId });
      setDeletedInvitations((prevDeleted) => [...prevDeleted, invitationId]);
    } catch (error) {
      console.error(error);
    }
  };

  // 초대받은 대시보드 GET Config
  const invitationConfig: AxiosRequestConfig = {
    url: `/invitations`,
    method: "GET",
  };

  // 초대받은 대시보드 목록 가져오기
  const {
    data: invitationData,
    error: invitationError,
    isLoading: invitationLoading,
  } = useQuery<InvitationsResponse>({
    queryKey: ["InvitationsResponse"],
    queryFn: () => fetcher<InvitationsResponse>(invitationConfig),
  });

  // 검색 - input
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
  };

  if (invitationLoading) {
    return <div>Loading...</div>;
  }
  if (invitationError || !invitationData) {
    return null;
  }

  // 초대받은 대시보드 목록
  const invitationArray = invitationData.invitations;

  // 거절한 것 제외한 초대받은 대시보드 목록
  const filteredDeletedInvitation = invitationArray.filter(
    (invitation) => !deletedInvitations.includes(invitation.id),
  );

  // 검색 결과 fiter 하기
  const getFilteredInvitations = () => {
    if (searchTitle === "") {
      return filteredDeletedInvitation;
    }
    return filteredDeletedInvitation.filter((invitation) =>
      invitation.dashboard.title
        .toLowerCase()
        .includes(searchTitle.toLowerCase()),
    );
  };

  // 검색 결과 filter 된 초대 목록
  const filteredInvitations = getFilteredInvitations();

  const Invitations = () => {
    return filteredInvitations.map((invitation) => (
      <tbody className='tablet:w-full tablet:table-fixed'>
        <tr
          key={invitation.id}
          className='w-full border-b-[1px] border-gray-30 tablet:table-row tablet:h-[70px]'
        >
          <td className='mb-[10px] mt-[16px] flex text-[14px] text-black-20 tablet:table-cell tablet:text-[16px]'>
            <p className='mr-[28px] text-[14px] text-gray-40 tablet:hidden'>
              이름
            </p>
            {invitation.dashboard.title}
          </td>
          <td className='mb-[16px] flex text-[14px] text-black-20 tablet:table-cell tablet:text-[16px]'>
            <p className='mr-[16px] text-[14px] text-gray-40 tablet:hidden'>
              초대자
            </p>
            {invitation.inviter.nickname}
          </td>
          <td className='mb-[16px] flex tablet:table-cell'>
            <div className='flex w-full gap-[10px]'>
              <button
                onClick={() => handleClickAcceptButton(invitation.id)}
                className='h-[28px] w-full rounded-[4px] bg-violet-20 text-[12px] font-medium text-white tablet:h-[30px] tablet:w-[72px] tablet:px-[20px] tablet:py-[6px] desktop:h-[32px] desktop:w-[84px] desktop:px-[23px] desktop:py-[7px]'
              >
                수락
              </button>
              <button
                onClick={() => handleClickRefuseButton(invitation.id)}
                className='h-[28px] w-full rounded-[4px] border-[1px] border-gray-30 text-[12px] font-medium text-violet-20 tablet:h-[30px] tablet:w-[72px] tablet:px-[20px] tablet:py-[6px] desktop:h-[32px] desktop:w-[84px] desktop:px-[23px] desktop:py-[7px]'
              >
                거절
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    ));
  };

  return (
    <div>
      {invitationArray.length === 0 ? (
        <NoInvitations />
      ) : (
        <section className='mx-[24px] my-[24px] box-border max-w-[1022px] rounded-md bg-white px-[16px] tablet:mx-[40px] desktop:ml-[40px]'>
          <h2 className='px-[16px] py-[24px] text-[20px] font-bold tablet:text-[24px]'>
            초대받은 대시보드
          </h2>
          <table className='box-border w-full tablet:table-fixed'>
            <colgroup className='hidden'>
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
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
                <td>이름</td>
                <td>초대자</td>
                <td>수락 여부</td>
              </tr>
            </thead>
            <Invitations />
          </table>
        </section>
      )}
    </div>
  );
}
