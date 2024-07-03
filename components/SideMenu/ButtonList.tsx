import fetcher from "@/lib/api/fetcher";
import { DashboardsResponse, DashboardResponse } from "@/lib/api/types/dashboards";
import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import ColorChip from "@/public/chip/circle_small.svg";
import Link from "next/link";
import { useRouter } from "next/router";

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDA5NywidGVhbUlkIjoiNi0yIiwiaWF0IjoxNzE5OTYwNjYwLCJpc3MiOiJzcC10YXNraWZ5In0.9YZREbJn1sstQkOI4v7rm0xo_pkbM1PD6-Fd7GmoCfA

const getDashboard = ():DashboardResponse[] | null | JSX.Element => {

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

  return dashboardArray
};


const ButtonList = () => {
  const router = useRouter();
  const { dashboardId } = router.query;
  const dashboardArray = getDashboard()

  if(Array.isArray(dashboardArray)){
    return dashboardArray.map((dashboard:DashboardResponse, index:number)=>(
      <Link href={`/dashboard/${dashboard.id}`}>
        <button key={index} className="flex justify-start items-center w-[276px] h-[45px] cursor-pointer active:bg-[#F1EFFD] rounded-[4px] max-desktop:w-[134px] max-tablet:w-fit">
          <ColorChip fill={dashboard.color}/>
          <p className="align-middle text-gray-50 max-tablet:hidden">{dashboard.title}</p>
       </button>
      </Link>
    ))
  }
}

export default ButtonList;