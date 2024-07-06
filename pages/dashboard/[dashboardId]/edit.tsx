import { useRouter } from "next/router";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import ChangeCard from "@/components/DashBoardEdit/ChangeCard";
import MemberList from "@/components/DashBoardEdit/MemberList";
import InvitationList from "@/components/DashBoardEdit/InvitationList";
import BackLink from "@/components/MyPage/BackLink";
import Button from "@/components/Button";
import DeleteModal from "@/components/Modal/AlarmModal";
import React, { useState } from "react";
import fetcher from "@/lib/api/fetcher";
import { useQueryClient } from "@tanstack/react-query";

const DashboardEditPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { dashboardId } = router.query;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dashboardIdNumber = Number(dashboardId);

  if (!dashboardId || isNaN(dashboardIdNumber)) {
    return <div>유효하지 않은 대시보드 ID</div>;
  }

  const handleDelete = async () => {
    try {
      await fetcher({
        url: `/dashboards/${dashboardId}`,
        method: "DELETE",
      });

      // 대시보드 삭제 후 쿼리 무효화 및 다시 가져오기
      await queryClient.invalidateQueries({ queryKey: ["DashboardsResponse"] });

      console.log(`${dashboardId} 삭제되었습니다.`);
      router.push("/mydashboard");
    } catch (error) {
      console.error("오류가 발생했습니다:", error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout
      dashboardId={dashboardIdNumber}
      showActionButton={true}
      showBadgeCounter={true}
      showProfileDropdown={true}
    >
      <div className='p-[12px] tablet:p-[20]'>
        <BackLink href={`/dashboard/${dashboardId}`} label='돌아가기' />
        <div className='flex flex-col gap-[11px] tablet:gap-3'>
          {/* 대시보드 정보 변경 컴포넌트 */}
          <ChangeCard />
          {/* 멤버 목록 표시 컴포넌트 */}
          <MemberList />
          {/* 초대 목록 표시 컴포넌트 */}
          <InvitationList />
        </div>
        <Button.Delete
          onClick={handleOpenModal}
          className='custom-class-name mt-[43px]'
        />
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message='정말 대시보드를 삭제하시겠습니까?'
        buttonText='확인'
        buttonAction={handleDelete}
      />
    </DashboardLayout>
  );
};

export default DashboardEditPage;
