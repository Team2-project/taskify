import React from "react";
import Image from "next/image";

interface CloseButtonProps {
  onClose: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <button onClick={onClose}>
      <Image
        className={`rounded-full object-cover`}
        src={"/icon/ic_close.svg"}
        alt='닫기'
        width={32}
        height={32}
      />
    </button>
  );
};

export default CloseButton;
