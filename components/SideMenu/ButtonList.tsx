import fetcher from "@/lib/api/fetcher";
import { DashboardsResponse, DashboardResponse } from "@/lib/api/types/dashboards";
import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import ColorChip from "@/public/chip/circle_small.svg";

const ButtonList = () => {

  const config: AxiosRequestConfig = {
    url:"/dashboards",
    method: "GET",
    params:{
      navigationMethod:"pagination"
    }
  };

  const {
    data: dashboardData,
    error: dashboardError,
    isLoading: dashboardloading,
  } = useQuery<DashboardsResponse>({
    queryKey: ["DashboardsResponse"], 
    queryFn: () => fetcher<DashboardsResponse>(config),
  });

  if(dashboardloading) {
    return <div>Loading...</div>
  };
  if(dashboardError || !dashboardData){
    return null;
  };

  const dashboardArray = dashboardData.dashboards;

  const BoardTitles = () => {
    return dashboardArray.map((dashboard, index)=>(
      <button key={index} className="flex justify-start items-center w-[276px] h-[45px] cursor-pointer rounded-[4px] max-desktop:w-[134px] max-tablet:w-fit">
        <ColorChip fill={dashboard.color}/>
        <p className="text-gray-50 max-tablet:hidden">{dashboard.title}</p>
      </button>
    ))
  }
  return (
    <div>
      {BoardTitles()}
    </div>
  )
}

export default ButtonList;