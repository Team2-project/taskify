import React from "react";
import ResModal from "@/components/Modal/ResModal";
import fetcher from "@/lib/api/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

interface DeleteColumnProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  columnId: number | null;
}

const DeleteColumn: React.FC<DeleteColumnProps> = ({
  isModalOpen,
  handleCloseModal,
  columnId,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { dashboardId } = router.query as { dashboardId: string };

  const deleteMutation = useMutation<void, Error>({
    mutationFn: async () => {
      if (columnId === null) {
        throw new Error("Invalid column ID");
      }

      await fetcher({
        url: `/columns/${columnId}`,
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns", dashboardId] });
      handleCloseModal();
      router.replace(`/dashboard/${dashboardId}`);
    },
    onError: (error) => {
      console.error("Failed to delete column", error);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div>
      <ResModal
        isOpen={isModalOpen}
        title='컬럼의 모든 카드가 삭제됩니다'
        DeleteButtonText='삭제'
        cancelButtonText='취소'
        onClose={handleCloseModal}
        buttonAction={handleDelete}
        type='col'
      />
    </div>
  );
};

export default DeleteColumn;
