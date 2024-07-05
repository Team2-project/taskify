// // const cardConfig: AxiosRequestConfig = {
//   //   url: "/cards",
//   //   method: "GET",
//   // };

//   // const {
//   //   data: cardData,
//   //   error: cardError,
//   //   isLoading: cardLoading,
//   // } = useQuery<cardData>({
//   //   queryKey: ["cardData"],
//   //   queryFn: () => fetcher<cardData>(cardConfig),
//   // });

//   // console.log(cardData);

//   // if (cardLoading) {
//   //   return <div>로딩 중...</div>;
//   // }

//   // if (cardError || !cardData) {
//   //   return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
//   // }

//   const router = useRouter();
//   const { membersId } = router.query;

//   const membersConfig: AxiosRequestConfig = {
//     url: `/members?membersId=${membersId}`,
//     method: "GET",
//   };

//   const {
//     data: membersData,
//     error: membersError,
//     isLoading: membersLoading,
//   }: UseQueryResult<MembersResponse, Error> = useQuery({
//     queryKey: ["membersData", membersId],
//     queryFn: () => fetcher<MembersResponse>(membersConfig),
//     enabled: !!membersId,
//   });

//   if (membersLoading || (membersId && membersLoading)) {
//     return <div>Loading...</div>;
//   }

//   // console.log(membersData);

//   // if (
//   //   cardError ||
//   //   (membersId && memberError) ||
//   //   !cardData ||
//   //   (membersId && !memberError)
//   // ) {
//   //   return <div>데이터를 불러오는 중 오류가 발생했습니다</div>;
//   // }