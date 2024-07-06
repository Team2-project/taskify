import DashboardLayout from "@/components/Layout/DashboardLayout";
import AddButton from "@/components/Button/AddButton/AddButton";
import ListButton from "@/components/Button/ListButton/ListButton";
import CreateDashBoardModal from "@/components/SideMenu/CreateDashBoardModal"; // 수정된 부분
import InvitedDashboard from "@/components/Table/InvitedDashboard/InvitedDashboard";
import { useRouter } from "next/router";
import { useState, useEffect, ChangeEvent } from "react";
import useDashboard from "@/hooks/useDashboard";
import usePagination from "@/components/Pagination/usePagination";

export default function MyDashBoard() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const { dashboards, isLoading, error, addDashboard } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Pagination
  const pageSize = 5;
  const [totalCount, setTotalCount] = useState(0);
  const { currentPage, renderPaginationButtons } = usePagination({
    totalCount,
    pageSize,
  });

  useEffect(() => {
    if (dashboards) {
      setTotalCount(dashboards.length);
    }
  }, [dashboards]);

  const postDashboard = (e: React.FormEvent, color: string) => {
    e.preventDefault();
    addDashboard({ title: inputValue, color });
    setIsModalOpen(false); // 모달 닫기
    setInputValue(""); //입력필드 초기화
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !dashboards) {
    return <div>Error loading dashboards</div>;
  }

  const startDashboard = (currentPage - 1) * pageSize;
  const endDashboard = startDashboard + pageSize;

  return (
    <>
      <DashboardLayout
        title='내 대시보드'
        showActionButton={false}
        showBadgeCounter={false}
        showProfileDropdown={true}
        showCreatedByMeIcon={false}
      >
        <div>
          <div className='mx-[24px] mb-[24px] w-full pr-[48px] tablet:mx-[20px] tablet:mb-[14px] tablet:mt-[40px] tablet:grid tablet:w-full tablet:grid-cols-2 tablet:gap-x-5 tablet:pl-[20px] tablet:pr-[40px] desktop:mx-[40px] desktop:w-[1022px] desktop:grid-cols-3 desktop:gap-x-0 desktop:px-0'>
            {/* 대시보드 생성 버튼 */}
            <AddButton
              className='mb-[8px] mt-[24px] w-full tablet:mx-[5px] tablet:my-[5px] desktop:w-332'
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              새로운 대시보드
            </AddButton>

            {/* 대시보드 버튼 목록 */}
            {dashboards.slice(startDashboard, endDashboard).map((dashboard) => (
              <ListButton
                className='mb-[8px] w-full tablet:mx-[5px] tablet:my-[5px] desktop:w-332'
                key={dashboard.id}
                children={dashboard.title}
                createdByMe={dashboard.createdByMe}
                onClick={() => {
                  router.push(`/dashboard/${dashboard.id}`);
                }}
              />
            ))}
          </div>

          {/* 페이지네이션 구현 */}
          <div className='mx-[24px] w-full px-[48px] tablet:mx-[20px] tablet:mb-[40px] tablet:px-[40px] desktop:w-[1022px] desktop:px-0'>
            {dashboards.length > 0 && renderPaginationButtons()}
          </div>

          {/* 대시보드 생성 모달창 */}
          <CreateDashBoardModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
            }}
          />

          {/* 초대받은 대시보드 - 있는 경우와 없는 경우에 따른 구현 */}
          <div>
            <InvitedDashboard />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
