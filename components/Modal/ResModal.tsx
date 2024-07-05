import Button from "@/components/Button";

interface ModalProps {
  isOpen: boolean;
  title: string;
  DeleteButtonText: string;
  cancelButtonText: string;
  onClose: () => void;
  buttonAction?: () => void;
  type: "col" | "mypage";
}

export default function ResModal({
  isOpen,
  title,
  onClose,
  buttonAction,
  DeleteButtonText,
  cancelButtonText,
  type = "col",
}: ModalProps) {
  const handleDeleteClick = () => {
    if (buttonAction) {
      buttonAction();
    }
    onClose();
  };

  const handleCloseClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-10 box-border h-full w-full bg-black bg-opacity-50'>
      <div className='fixed inset-0 m-auto h-[220px] w-[327px] rounded-[8px] bg-white px-[20px] py-[28px] tablet:h-[250px] tablet:w-[540px] tablet:p-[28px]'>
        <div className='mt-[53px] flex justify-center text-[16px] font-medium tablet:mt-[80px] tablet:text-[18px]'>
          {title}
        </div>
        {type === "col" ? (
          <div className='mt-[50px] flex justify-end gap-[11px] tablet:mt-[45px]'>
            <Button
              onClick={handleDeleteClick}
              className='h-[42px] w-[138px] rounded-[8px] text-[14px] font-medium text-white tablet:text-[16px]'
            >
              {DeleteButtonText}
            </Button>
            <Button
              onClick={handleCloseClick}
              className='h-[42px] w-[138px] rounded-[8px] border-[1px] border-gray-30 bg-white text-[14px] font-medium text-gray-50 tablet:text-[16px]'
            >
              {cancelButtonText}
            </Button>
          </div>
        ) : (
          <div className='mt-[50px] flex justify-end gap-[11px] tablet:mt-[45px]'>
            <Button
              onClick={handleCloseClick}
              className='h-[42px] w-[138px] rounded-[8px] text-[14px] font-medium text-white tablet:text-[16px]'
            >
              {DeleteButtonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
