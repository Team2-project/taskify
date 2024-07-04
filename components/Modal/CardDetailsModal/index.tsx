import { FC, useEffect, useState } from "react";
import WriteComment from "@/components/Comments/WriteComment";
import CommentList from "@/components/Comments/CommentList";
import AssigneeDetails from "./CardDetails/AssigneeDetails";
import CardDescription from "./CardDetails/CardDescription";
import Tag from "@/components/Tag/Tag";
import CloseButton from "./CardDetails/CloseButton";
import CardDropdown from "./CardDetails/CardDropdown";
import ColumnTitle from "./CardDetails/ColumnTitle";
import useModal from "@/hooks/useModal";
import CardEditModal from "../CardModal/CardEditModal";

interface ModalProps {
  isOpen: boolean;
  value: string;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  subTitle: string;
  cardId: number;
  dashboardId: number;
  columnId: number;
  onSuccess: () => void;
}

const CardDetailsModal: FC<ModalProps> = ({
  isOpen,
  value,
  onClose,
  onSubmit,
  title,
  subTitle,
  cardId,
  dashboardId,
  columnId,
  onSuccess,
}) => {
  const {
    isOpen: modalIsOpen,
    isLoading,
    error,
    cardDetails,
    openModal,
    closeModal,
  } = useModal(isOpen, cardId);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [isOpen, openModal, closeModal]);

  const handleSuccess = () => {
    onSuccess(); // 추가
  };

  if (!modalIsOpen || !cardDetails) return null;

  const handleEdit = (id: number) => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    onClose(); // CardDetailsModal 닫기
    window.location.reload(); // 페이지 리로드하여 최신 데이터 반영
  };

  return (
    <>
      <div className='fixed inset-0 z-50 flex min-w-[370px] items-center justify-center bg-black bg-opacity-50'>
        <div className='mx-[24px] max-h-screen w-full overflow-y-auto rounded-[8px] bg-white p-[20px] shadow-lg tablet:max-h-[770px] tablet:w-[730px] desktop:max-h-[770px] desktop:w-[730px]'>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='word-wrap w-full whitespace-normal text-xl font-semibold tablet:w-[420px] desktop:w-[420px]'>
              {cardDetails.title}
            </h2>

            <div className='flex space-x-2'>
              <CardDropdown
                dashboardId={dashboardId}
                cardId={cardId}
                onEdit={() => setIsEditModalOpen(true)}
                onDelete={handleDelete}
              />
              <CloseButton onClose={onClose} />
            </div>
          </div>

          <div className='block tablet:hidden'>
            <div className='my-[16px]'>
              <AssigneeDetails cardDetails={cardDetails} />
            </div>
            <div className='my-[16px] flex flex-wrap items-center space-x-[8px]'>
              <ColumnTitle
                columnId={cardDetails?.columnId}
                dashboardId={dashboardId}
              />

              <span className='font-bold text-gray-30'>|</span>
              <span className='font-bold text-gray-30'>|</span>
              {cardDetails.tags.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </div>{" "}
            <div className='mb-[20px]'>
              <CardDescription cardDetails={cardDetails} />
            </div>
            <WriteComment
              cardId={cardId}
              columnId={cardDetails.columnId}
              dashboardId={dashboardId}
            />
            <div className='mb-[16px]'>
              <CommentList cardId={cardId} />
            </div>
          </div>

          <div className='hidden tablet:grid tablet:grid-cols-3 tablet:gap-4'>
            <div className='col-span-2 flex items-center'>
              <ColumnTitle
                columnId={cardDetails?.columnId}
                dashboardId={dashboardId}
              />
              <span className='mx-2 font-bold text-gray-30'>|</span>
              <div className='flex flex-wrap items-center space-x-[8px]'>
                {cardDetails.tags.map((tag) => (
                  <Tag key={tag} tag={tag} />
                ))}
              </div>
            </div>
            <div className='col-span-1 row-span-3'>
              <AssigneeDetails cardDetails={cardDetails} />
            </div>
            <div className='col-span-2 mb-[20px]'>
              <CardDescription cardDetails={cardDetails} />
            </div>
            <div className='col-span-1'></div>
            <div className='col-span-2'>
              <WriteComment
                cardId={cardId}
                columnId={cardDetails.columnId}
                dashboardId={dashboardId}
              />
            </div>
            <div className='col-span-1'></div>
            <div className='col-span-2 mb-[16px]'>
              <CommentList cardId={cardId} />
            </div>
            <CardEditModal
              isOpen={isEditModalOpen}
              onSubmit={onSubmit}
              onClose={() => setIsEditModalOpen(false)}
              buttonAction={onSuccess} // 수정 후 성공 시 onSuccess 호출
              createButtonText='수정'
              cancelButtonText='취소'
              cardId={cardId}
              columnId={columnId}
              dashboardId={dashboardId}
            />
            <div className='col-span-1'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetailsModal;
