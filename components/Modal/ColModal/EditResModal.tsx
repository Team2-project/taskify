interface ModalProps {
  isOpen: boolean;
  // value: string;
  title: string;
  // subTitle: string;
  // type: "add" | "edit";
  // createButtonText: string;
  // cancelButtonText: string;
  // placeholder: string;
  // onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // onClose: () => void;
  // buttonAction?: () => void;
}

export default function EditResModal({ isOpen, title }: ModalProps) {
  // if (!isOpen) return null;

  return (
    <div className='fixed inset-0 box-border h-full w-full bg-black bg-opacity-50'>
      <div className='fixed inset-0 m-auto w-[327px] rounded-[8px] bg-white px-[20px] py-[28px] tablet:h-[276px] tablet:w-[540px] tablet:px-[28px] tablet:pb-[28px] tablet:pt-[32px]'></div>
    </div>
  );
}

