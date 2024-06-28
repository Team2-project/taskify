import fetcher from "@/lib/api/fetcher";
import { GetDashboardsRequest, DashboardsResponse, DashboardResponse } from "@/lib/api/types/dashboards";
import { AxiosRequestConfig } from "axios";

//목록은 목록 안의 내용의 갯수가 바뀌면 바뀜
//useAPI에 GetDashRequest를 보낼 때 pagenation으로
//받아온 데이터는 배열이어야함
//리턴 안에 타이틀 동적요소로
//버튼이 렌더링 되는 갯수=배열갯수 아마 구조분해할당하면 될 듯..
//버튼을 많이 리턴 시키는 법..?

//1.데이터 받아오기
//2.받아온 데이터에서 필요한 값에 접근하기
//3.동적인 타이틀 버튼 만들기
//4.여러개 렌더링 시키기

const BoardTitle = () => {

  const config: AxiosRequestConfig = {
    url:"/dashboards",
    method: "GET",
    headers: {navigationMethod:
    },
  };
}