import Button from "@/components/Button";
import Form from "../Form/FormField/FormField";

interface ModalProps {
  isOpen: boolean;
  value: string;
  onClose: () => void;
  buttonAction?: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cancelButtonText: string;
  createButtonText: string;
  title: string;
  subTitle: string;
  placeholder: string;
}

export default function BasicModal({
  isOpen,
  value,
  onClose,
  onSubmit,
  onChange,
  buttonAction,
  title,
  subTitle,
  placeholder,
  cancelButtonText,
  createButtonText,
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
    <div className='fixed inset-0 box-border h-full w-full bg-black bg-opacity-50'>
      <div className='fixed inset-0 m-auto h-[276px] w-[540px] rounded-[8px] bg-white px-[28px] pb-[28px] pt-[32px]'>
        <div className='mb-[32px] text-[20px] font-bold'>{title}</div>
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
        <div className='flex items-center justify-center gap-[11px] py-[28px]'>
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
  );
}

