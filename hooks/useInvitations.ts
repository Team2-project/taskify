/*
   useInvitations: 내가 받은 (대시보드) 초대 목록 조회, 초대 응답(수락, 거절) Data 통신 Hook
*/
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import fetcher from "@/lib/api/fetcher";
import {
  InvitationsRequest,
  InvitationsResponse,
  InvitationResponseRequest,
  InvitationResponse,
} from "@/lib/api/types/invitations";

const useInvitations = () => {
  const queryClient = useQueryClient();

  // 초대 목록 조회
  const fetchInvitations = async (
    params: InvitationsRequest,
  ): Promise<InvitationsResponse> => {
    try {
      return await fetcher<InvitationsResponse>({
        url: "/invitations",
        method: "GET",
        params,
      });
    } catch (error) {
      throw new Error("Failed to fetch invitations");
    }
  };

  const queryKey = ["invitations"];
  const initialData = queryClient.getQueryData<InvitationsResponse>(queryKey);

  const { data, error, isLoading } = useQuery<InvitationsResponse, Error>({
    queryKey,
    queryFn: () => fetchInvitations({}),
    initialData,
  });

  const displayData = isLoading && initialData ? initialData : data;

  // 초대 응답
  const respondToInvitation = async (
    invitationId: number,
    response: InvitationResponseRequest,
  ): Promise<InvitationResponse> => {
    try {
      return await fetcher<InvitationResponse>({
        url: `/invitations/${invitationId}`,
        method: "PUT",
        data: response,
      });
    } catch (error) {
      throw new Error("Failed to respond to invitation");
    }
  };

  const { mutate: respondInvitation } = useMutation<
    InvitationResponse,
    Error,
    { invitationId: number; response: InvitationResponseRequest }
  >({
    mutationFn: ({ invitationId, response }) =>
      respondToInvitation(invitationId, response),
    onSuccess: () => {
      // 초대 응답 후 초대 목록 쿼리를 무효화하여 최신 데이터로 갱신
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
    },
    onError: (error) => {
      console.error("Respond to invitation failed:", error);
    },
  });

  return {
    invitations: displayData?.invitations,
    isLoading,
    error,
    respondInvitation,
  };
};

export default useInvitations;
