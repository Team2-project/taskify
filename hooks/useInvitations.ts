/*
   useInvitations: 내가 받은 (대시보드) 초대 목록 조회, 초대 응답(수락, 거절) Data 통신 Hook
*/
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import fetcher from "@/lib/api/fetcher";
import { AxiosRequestConfig } from "axios";
import {
  InvitationsRequest,
  InvitationsResponse,
  InvitationResponseRequest,
  InvitationResponse,
} from "@/lib/api/types/invitations";

const useInvitations = () => {
  const queryClient = useQueryClient();

  // 초대받은 대시보드 목록 가져오기
  const fetchInvitations = async (): Promise<InvitationsResponse> => {
    const config: AxiosRequestConfig = {
      url: `/invitations`,
      method: "GET",
    };
    return fetcher<InvitationsResponse>(config);
  };

  const { data, error, isLoading } = useQuery<InvitationsResponse>({
    queryKey: ["InvitationsResponse"],
    queryFn: fetchInvitations,
  });

  // 초대 응답 mutation
  const mutation = useMutation<
    InvitationResponse,
    Error,
    { invitationId: number; response: InvitationResponseRequest }
  >({
    mutationFn: async ({ invitationId, response }) => {
      const config: AxiosRequestConfig = {
        url: `/invitations/${invitationId}`,
        method: "PUT",
        data: response,
      };
      return fetcher<InvitationResponse>(config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["InvitationsResponse"] });
    },
  });

  return {
    invitations: data?.invitations || [],
    isLoading,
    error,
    respondInvitation: mutation.mutate,
  };
};

export default useInvitations;
