import { FC } from "react";
import Image from "next/image";

interface ActionButtonProps {
  label: string;
  iconSrc: string;
}

const ActionButton: FC<ActionButtonProps> = ({ label, iconSrc }) => {
  return (
    <button
      className='relative inline-flex items-center justify-center rounded-lg border border-gray-30 p-3 tablet:p-4 desktop:p-4'
      style={{ height: "40px" }}
    >
      <div className='hidden tablet:inline-block desktop:inline-block'>
        <Image
          src={iconSrc}
          alt={label}
          width={20}
          height={20}
          className='mr-2'
        />
      </div>
      {label}
    </button>
  );
};

export default ActionButton;
