import DropDown from "@/components/Input/DropDown";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Input/Textarea";
import Calendar from "@/components/Input/Calendar";
import TagInput from "@/components/Input/TagInput";
import ImgInput from "@/components/Input/ImgInput";
import Button from "@/components/Button";

interface ModalProps {
  isOpen: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonAction: () => void;
  onClose: () => void;
  createButtonText: string;
  cancelButtonText: string;
}

export default function CardEditModal({
  isOpen,
  onSubmit,
  onClose,
  buttonAction,
  createButtonText,
  cancelButtonText,
}: ModalProps) {
  const handleButtonClick = () => {
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
    <div className='fixed inset-0 box-border h-full w-full border bg-black bg-opacity-50'>
      <div className='fixed inset-0 m-auto h-[869px] w-[327px] rounded-[8px] bg-white px-[20px] pb-[20px] pt-[28px] tablet:h-[907px] tablet:w-[506px] tablet:px-[28px] tablet:pb-[28px] tablet:pt-[32px]'>
        <div className='text-[20px] font-bold tablet:text-[24px]'>
          할 일 수정
        </div>
        <div className="tablet:flex tablet:justify-center tablet:items-center tablet:gap-[16px]">
          <DropDown subTitle='상태' />
          <DropDown subTitle='담당자' />
        </div>
        <Input subTitle='제목' />
        <Textarea subTitle='설명' />
        <Calendar subTitle='마감일' />
        <TagInput subTitle='태그' />
        <ImgInput subTitle='이미지' />
        <div className='mt-[18px] flex w-full items-center justify-center gap-[11px] tablet:mt-[26px] tablet:justify-end'>
          <Button
            onClick={handleButtonClick}
            className='h-[50px] w-full rounded-[8px] text-white'
          >
            {createButtonText}
          </Button>
          <Button
            onClick={handleCloseClick}
            className='h-[50px] w-full rounded-[8px] border-[1px] border-gray-30 bg-white text-gray-50'
          >
            {cancelButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className='fixed inset-0 box-border h-full w-full border bg-black bg-opacity-50'>
      <div className='fixed inset-0 m-auto h-[766px] w-[327px] rounded-[8px] bg-white px-[20px] pb-[20px] pt-[28px] tablet:h-[907px] tablet:w-[506px] tablet:px-[28px] tablet:pb-[28px] tablet:pt-[32px]'>
        <div className='text-[20px] font-bold tablet:text-[24px]'>
          할 일 생성
        </div>
        <div>상태</div>
        <div className='relative flex h-[42px] w-full items-center rounded-[6px] border-[1px] border-gray-30 p-4 active:border-[1px] active:border-violet-20'>
          <button
            onClick={() => setDropOpen((prev) => !prev)}
            className='flex w-full items-center justify-between'
          >
            <div className='flex h-[20px] w-[55px] items-center justify-around rounded-[11px] border-[1px] border-violet-20 bg-violet-10'>
              <Image width={6} height={6} src='chip/purple.svg' alt='fasd' />
              <div className='text-[10px] font-normal text-violet-20'>
                To Do
              </div>
            </div>
            {dropOpen ? dropButton.open : dropButton.close}
          </button>
        </div>
        {dropOpen && (
          <div className='absolute top-[17%] flex w-[287px] flex-col gap-[5px] rounded-[6px] border-[1px] border-gray-30 p-4 active:border-[1px] active:border-violet-20'>
            {list.map((item: any, i: any) => (
              <div
                className='w-fullcursor-pointer mb-[4px] flex justify-start rounded-[6px] hover:border-l-[4px] hover:border-l-white hover:bg-violet-10'
                key={i}
              >
                <div className=''>{item.listItem}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div> */
}

