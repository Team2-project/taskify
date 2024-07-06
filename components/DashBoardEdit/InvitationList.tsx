import React, { useState } from "react";
import CustomComponent from "./components/UserCard";
import Button from "@/components/Button";
import fetcher from "@/lib/api/fetcher";
import { useRouter } from "next/router";
import { DashboardInvitationsResponse } from "@/lib/api/types/dashboards";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import DashBoardForm from "./components/DashBoardForm";
import InvitationModal from "./InvitationModal";

const InvitationList: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const size = 5;
  const [deletedInvitations, setDeletedInvitations] = useState<number[]>([]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const router = useRouter();
  const { dashboardId } = router.query;

  const queryClient = useQueryClient();

  const invitationsConfig: AxiosRequestConfig = {
    url: `/dashboards/${dashboardId}/invitations?page=${page}&size=${size}`,
    method: "GET",
  };

  const {
    data: invitationsData,
    error: invitationsError,
    isLoading: invitationsLoading,
    refetch: refetchInvitations,
  } = useQuery({
    queryKey: ["invitationsData", dashboardId, page],
    queryFn: () => fetcher<DashboardInvitationsResponse>(invitationsConfig),
    enabled: !!dashboardId,
  });

  const mutation = useMutation({
    mutationFn: (invitationId: number) =>
      fetcher({
        url: `dashboards/${dashboardId}/invitations/${invitationId}`,
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invitationsData", dashboardId, page],
      });
    },
  });

  const handleButtonClick = (invitationId: number) => {
    mutation.mutate(invitationId);
    setDeletedInvitations((prevDeleted) => [...prevDeleted, invitationId]);
  };

  const handleInvitation = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (!dashboardId || Array.isArray(dashboardId)) {
    return <div>유효하지 않은 대시보드 ID</div>;
  }

  if (invitationsLoading) {
    return <div>로딩 중...</div>;
  }

  if (invitationsError) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
  }

  if (!invitationsData || !invitationsData.invitations) {
    return <div>데이터가 없습니다</div>;
  }

  const totalCount = invitationsData.totalCount;

  // 삭제된 초대를 제외한 초대 목록 필터링
  const filteredInvitations = invitationsData.invitations.filter(
    (invitation) => !deletedInvitations.includes(invitation.id),
  );

  return (
    <div className='h-395 max-w-[620px] bg-white tablet:h-477'>
      <div className='mt-[20px] flex w-full items-center justify-between px-[20px] tablet:px-[28px]'>
        <h2 className='text-xl font-bold tablet:text-2xl'>초대 내역</h2>
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

      <div className='mb-[20px] mt-[18px] flex items-center justify-between px-[20px] tablet:mb-[24px] tablet:mt-[27px] tablet:pl-[28px] tablet:pr-[20px]'>
        <p className='text-sm font-normal text-gray-40 tablet:text-base'>
          이메일
        </p>
        <DashBoardForm onSubmit={handleInvitation}>
          <DashBoardForm.Button
            type='button'
            icon='/icon/ic_plus_edit.svg'
            onClick={handleInvitation}
          >
            초대하기
          </DashBoardForm.Button>
        </DashBoardForm>
      </div>

      {filteredInvitations.length === 0 ? (
        <div className='mt-[100px] flex justify-center'>
          <p>초대 요청한 구성원이 없습니다</p>
        </div>
      ) : (
        <div className='flex flex-col gap-[24px]'>
          {filteredInvitations.map((invitation) => (
            <CustomComponent
              key={invitation.id}
              title={invitation.invitee.email}
              buttonLabel='취소'
              onButtonClick={() => handleButtonClick(invitation.id)}
            />
          ))}
        </div>
      )}

      <InvitationModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default InvitationList;
