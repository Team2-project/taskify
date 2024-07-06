import DashboardLayout from "@/components/Layout/DashboardLayout";
import AddButton from "@/components/Button/AddButton/AddButton";
import ListButton from "@/components/Button/ListButton/ListButton";
import CreateDashBoard from "@/components/Modal/CreateDashBoard/CreateDashBoard";
import InvitedDashboard from "@/components/Table/InvitedDashboard/InvitedDashboard";
import { useRouter } from "next/router";
import { useState, useEffect, ChangeEvent } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { DashboardsResponse } from "@/lib/api/types/dashboards";
import fetcher from "@/lib/api/fetcher";
import { AxiosRequestConfig } from "axios";
import usePagination from "@/components/Pagination/usePagination";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateDashboardRequest, DashboardResponse } from "@/lib/api/types/dashboards";


export default function MyDashBoard() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('')


  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewDashboardTitle(e.target.value);
  };

  // data per page
  const pageSize = 5;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newDashBoardTitle, setNewDashboardTitle] = useState("");

  const getDashboardList = async (currentPage?: number, pageSize?: number) => {
    const response = await fetcher<DashboardsResponse>({
      url: "/dashboards",
      params: {
        navigationMethod: "pagination",
        page: currentPage,
        size: 5,
      },
    });
    return response;
  };

  const [totalCount, setTotalCount] = useState(0);

  // usePagination
  const { currentPage, renderPaginationButtons } = usePagination({
    totalCount,
    pageSize,
  });

  const { data } = useQuery<DashboardsResponse>({
    queryKey: ["dashBoards", currentPage, pageSize],
    queryFn: () => getDashboardList(currentPage, pageSize),
    placeholderData: keepPreviousData,
    staleTime: 1000,
  });

  useEffect(() => {
    if (!data?.totalCount) return;
    setTotalCount(data?.totalCount);
  }, [data?.totalCount]);

  const config: AxiosRequestConfig = {
    url: "/dashboards",
    method: "GET",
    params: {
      navigationMethod: "pagination",
    },
  };

  const {
    data: dashboardData,
    error: dashboardError,
    isLoading: dashboardloading,
  } = useQuery<DashboardsResponse>({
    queryKey: ["DashboardsResponse"],
    queryFn: () => fetcher<DashboardsResponse>(config),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation<DashboardResponse, Error,CreateDashboardRequest>({
    mutationFn: async (title) => {
      const response = await fetcher<DashboardResponse>({
        url: "/dashboards",
        method: "POST",
        data: title,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["titles"]
      })},
      onError: (error) => {
          console.error(error)
        }
    }
  )
  const postDashboard = (e: React.FormEvent, color: string) => {
    // 자식 컴포넌트가 부모 컴포넌트한테 값을 전달해주려면
    // 함수를 통해, (함수의 parameter를 통해) 전달이 가능하다!
    e.preventDefault();
    mutation.mutate({title: inputValue, color})
  };

  const BoardButtons = () => {
    return dashboardArray
      .slice(startDashboard - 1, endDashboard)
      .map((dashboard) => (
        <ListButton
          className='mb-[8px] w-full tablet:mx-[5px] tablet:my-[5px] desktop:w-332'
          children={dashboard.title}
          createdByMe={dashboard.createdByMe}
          onClick={() => {
            router.push(`/dashboard/${dashboard.id}`);
          }}
          key={dashboard.id}
        />
      ));
  };

  const PaginationButtons = renderPaginationButtons();

  if (dashboardloading) {
    return <div>Loading...</div>;
  }
  if (dashboardError || !dashboardData) {
    return null;
  }
  const dashboardArray = dashboardData.dashboards;

  const startDashboard = (currentPage - 1) * pageSize + 1;
  const endDashboard = startDashboard + pageSize - 1;

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
              children='새로운 대시보드'
            />

            {/* 대시보드 버튼 목록 */}
            <BoardButtons />
          </div>

          {/* 페이지네이션 구현 */}
          <div className='mx-[24px] w-full px-[48px] tablet:mx-[20px] tablet:mb-[40px] tablet:px-[40px] desktop:w-[1022px] desktop:px-0'>
            {data?.totalCount !== 0 && PaginationButtons}
          </div>

          {/* 대시보드 생성 모달창 */}
          <CreateDashBoard
            isOpen={isModalOpen}
            title='새로운 대시보드'
            value={newDashBoardTitle}
            subTitle='대시보드 이름'
            placeholder='대시보드 이름'
            createButtonText='생성'
            cancelButtonText='취소'
            onClose={() => {
              setIsModalOpen(false);
            }}
            onSubmit={() => {postDashboard}}
            onChange={handleChangeInput}
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
