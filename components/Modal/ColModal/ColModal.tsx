import Button from "@/components/Button";
import Form from "@/components/Form/FormField/FormField";

interface ModalProps {
  isOpen: boolean;
  value: string;
  title: string;
  subTitle: string;
  type: "add" | "edit";
  placeholder: string;
  createButtonText: string;
  cancelButtonText: string;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonAction?: () => void;
}

export default function ColModal({
  isOpen,
  value,
  title,
  subTitle,
  type = "add",
  placeholder,
  createButtonText,
  cancelButtonText,
  onClose,
  onSubmit,
  onChange,
  buttonAction,
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

  const baseClasses =
    "fixed inset-0 m-auto w-[327px] rounded-[8px] bg-white px-[20px] py-[28px] tablet:h-[276px] tablet:w-[540px] tablet:px-[28px] tablet:pb-[28px] tablet:pt-[32px]";

  const typeClasses = {
    add: "h-[241px]",
    edit: "h-[274px]",
  }[type];

  return (
    <div className='fixed inset-0 box-border h-full w-full bg-black bg-opacity-50'>
      <div className={`${baseClasses} ${typeClasses}`}>
        <div className='mb-[24px] text-[20px] font-bold tablet:mb-[32px]'>
          {title}
        </div>
        <Form onSubmit={onSubmit}>
          <Form.Field
            label={subTitle}
            type='text'
            name={subTitle}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        </Form>
        <div className='mt-[18px] flex flex-col items-start gap-[10px] tablet:mt-[28px] tablet:flex-row tablet:items-center tablet:justify-between'>
          {type === "add" ? (
            ""
          ) : (
            <button className='w-[56px] text-[14px] font-normal text-gray-40 underline'>
              삭제하기
            </button>
          )}
          <div className='flex w-full items-center justify-center gap-[11px] tablet:justify-end'>
            <Button
              onClick={handleButtonClick}
              className='h-[42px] w-[138px] rounded-[8px] text-white'
            >
              {createButtonText}
            </Button>
            <Button
              onClick={handleCloseClick}
              className='h-[42px] w-[138px] rounded-[8px] border-[1px] border-gray-30 bg-white text-gray-50'
            >
              {cancelButtonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

