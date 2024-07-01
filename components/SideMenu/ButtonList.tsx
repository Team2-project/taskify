import fetcher from "@/lib/api/fetcher";
import { DashboardsResponse, DashboardResponse } from "@/lib/api/types/dashboards";
import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import ColorChip from "@/public/chip/circle.svg";

const ButtonList = () => {

  const config: AxiosRequestConfig = {
    url:"/dashboards",
    method: "GET",
    headers: {
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

  if(dashboardloading) {
    return <div>Loading...</div>
  };
  if(dashboardError || !dashboardData){
    return null;
  };

  const dashboardArray = dashboardData.dashboards;

  const BoardTitles = () => {
    return dashboardArray.map((dashboard, index)=>(
      <button key={index}>
        <ColorChip fill={dashboard.color}/>
        <p>{dashboard.title}</p>
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