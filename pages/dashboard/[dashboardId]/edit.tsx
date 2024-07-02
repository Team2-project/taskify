import { useRouter } from "next/router";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import ChangeCard from "@/components/DashBoardEdit/ChangeCard";
import MemberList from "@/components/DashBoardEdit/MemberList";
import InvitationList from "@/components/DashBoardEdit/InvitationList";
import BackLink from "@/components/MyPage/BackLink";
import Button from "@/components/Button";
import DeleteModal from "@/components/Modal/AlarmModal";
import React, { useState, useEffect } from "react";
import fetcher from "@/lib/api/fetcher";

const DashboardEditPage = () => {
  const router = useRouter();
  const { dashboardId } = router.query;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validDashboardId, setValidDashboardId] = useState<string | null>(null);

  useEffect(() => {
    if (dashboardId && !Array.isArray(dashboardId)) {
      setValidDashboardId(dashboardId);
    }
  }, [dashboardId]);

  if (!validDashboardId) {
    return <div>유효하지 않은 대시보드 ID</div>;
  }

  const handleDelete = async () => {
    if (!validDashboardId) return;

    try {
      await fetcher({
        url: `/dashboards/${validDashboardId}`,
        method: "DELETE",
      });

      console.log(`${validDashboardId} 삭제되었습니다.`);
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
      dashboardId={validDashboardId}
      showActionButton={true}
      showBadgeCounter={true}
      showProfileDropdown={true}
    >
      <div className='p-[12px] tablet:p-[20]'>
        <BackLink href={`/dashboard/${validDashboardId}`} label='돌아가기' />
        <div className='flex flex-col gap-[11px] tablet:gap-3'>
          <ChangeCard />
          <MemberList />
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
