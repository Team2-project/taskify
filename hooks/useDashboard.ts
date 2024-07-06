/*
    useDashboard: 조회, 생성, 수정, 삭제 기능
*/

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import fetcher from "@/lib/api/fetcher";
import { AxiosRequestConfig } from "axios";
import {
  CreateDashboardRequest,
  DashboardResponse,
  DashboardsResponse,
  UpdateDashboardRequest,
  GetDashboardsRequest,
} from "@/lib/api/types/dashboards";

const useDashboard = () => {
  const queryClient = useQueryClient();

  // 대시보드 리스트 조회
  const fetchDashboards = async (
    params: GetDashboardsRequest,
  ): Promise<DashboardsResponse> => {
    try {
      return await fetcher<DashboardsResponse>({
        url: "/dashboards",
        params: params,
      });
    } catch (error) {
      throw new Error("Failed to fetch dashboards");
    }
  };

  const queryKey = [
    "dashboards",
    { navigationMethod: "pagination", page: 1, size: 40 },
  ];
  const initialData = queryClient.getQueryData<DashboardsResponse>(queryKey);

  const { data, error, isLoading } = useQuery<DashboardsResponse, Error>({
    queryKey,
    queryFn: () =>
      fetchDashboards({ navigationMethod: "pagination", page: 1, size: 30 }),
    initialData,
  });

  const displayData = isLoading && initialData ? initialData : data;

  // 대시보드 생성
  const createDashboard = async (
    dashboardData: CreateDashboardRequest,
  ): Promise<DashboardResponse> => {
    try {
      return await fetcher<DashboardResponse>({
        url: "/dashboards",
        method: "POST",
        data: dashboardData,
      });
    } catch (error) {
      throw new Error("Failed to create dashboard");
    }
  };

  // 대시보드 생성 mutation 옵션
  const mutationOptions: UseMutationOptions<
    DashboardResponse,
    Error,
    CreateDashboardRequest
  > = {
    mutationFn: createDashboard,
    onSuccess: () => {
      // 대시보드 생성이 성공한 후 대시보드 목록 쿼리를 무효화
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
    },
    onError: (error: Error) => {
      console.error("Create dashboard failed:", error);
    },
  };

  const { mutate: addDashboard } = useMutation(mutationOptions);

  // 대시보드 수정
  const updateDashboard = async (
    dashboardId: number,
    dashboardData: UpdateDashboardRequest,
  ): Promise<DashboardResponse> => {
    return fetcher<DashboardResponse>({
      url: `/dashboards/${dashboardId}`,
      method: "PUT",
      data: dashboardData,
    });
  };

  const { mutate: editDashboard } = useMutation<
    DashboardResponse,
    Error,
    { dashboardId: number; dashboardData: UpdateDashboardRequest }
  >({
    mutationFn: ({ dashboardId, dashboardData }) =>
      updateDashboard(dashboardId, dashboardData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
    },
    onError: (error) => {
      console.error("Update failed", error);
    },
  });

  // 대시보드 삭제
  const deleteDashboard = async (
    dashboardId: number,
  ): Promise<{ message: string }> => {
    return fetcher<{ message: string }>({
      url: `/dashboards/${dashboardId}`,
      method: "DELETE",
    });
  };

  const { mutate: removeDashboard } = useMutation<
    { message: string },
    Error,
    number
  >({
    mutationFn: deleteDashboard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
    },
    onError: (error) => {
      console.error("Delete dashboard failed", error);
    },
  });
  return {
    dashboards: displayData?.dashboards,
    isLoading,
    error,
    addDashboard,
    editDashboard,
    removeDashboard,
    updateDashboard, // 추가: updateDashboard 함수를 반환
  };
};

export default useDashboard;
