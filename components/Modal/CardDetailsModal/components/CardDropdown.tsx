import { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetcher from "@/lib/api/fetcher";
import { useRouter } from "next/router";
import ResModal from "@/components/Modal/ResModal";

interface CardDropdownProps {
  cardId: number;
  dashboardId: number;
  onEdit: () => void;
  onDelete: () => void;
}

const CardDropdown: FC<CardDropdownProps> = ({
  cardId,
  dashboardId,
  onEdit,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const deleteMutation = useMutation<void, Error>({
    mutationFn: async () => {
      await fetcher({
        url: `cards/${cardId}`,
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cards", dashboardId],
      });
      onDelete(); // CardDetailsModal을 닫는 콜백 호출
      router.replace(`/dashboard/${dashboardId}`); // 페이지를 다시 로드하여 최신 데이터를 가져옴
    },
    onError: (error) => {
      console.error("Failed to delete card", error);
    },
  });

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalDelete = async () => {
    await deleteMutation.mutateAsync(); // 삭제 요청
  };

  const handleEdit = () => {
    onEdit();
    setIsOpen(false); // 드롭다운 메뉴 닫기
  };

  return (
    <div className='relative inline-block' ref={menuRef}>
      {isModalOpen && (
        <ResModal
          isOpen={isModalOpen}
          title='정말 삭제하시겠습니까?'
          DeleteButtonText='삭제'
          cancelButtonText='취소'
          onClose={handleModalClose}
          buttonAction={handleModalDelete}
          type='col'
        />
      )}
      <button
        onClick={toggleDropdown}
        className='flex items-center justify-center'
      >
        <Image
          src={"/icon/ic_kebab_menu.svg"}
          alt='수정/삭제하기'
          width={32}
          height={32}
        />
      </button>
      {isOpen && (
        <ul className='absolute right-0 z-10 mt-2 w-[120px] rounded border-[1px] border-gray-30 bg-white shadow-lg'>
          <div>
            <li className='p-[8px]'>
              <button
                onClick={handleEdit}
                className='focus:bg-purple-bg w-full rounded-[4px] px-4 py-2 text-left text-center hover:bg-purple-10 hover:text-purple focus:outline-none'
              >
                수정하기
              </button>
            </li>
          </div>
          <div>
            <li className='p-[8px]'>
              <button
                onClick={handleDelete}
                className='focus:bg-purple-bg w-full rounded-[4px] px-4 py-2 text-left text-center hover:bg-purple-10 hover:text-purple focus:outline-none'
              >
                삭제하기
              </button>
            </li>
          </div>
        </ul>
      )}
    </div>
  );
};

export default CardDropdown;
