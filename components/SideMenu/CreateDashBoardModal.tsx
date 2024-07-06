import React, { useState } from "react";
import CreateDashBoard from "@/components/Modal/CreateDashBoard/CreateDashBoard";
import useDashboard from "@/hooks/useDashboard";

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DashboardModal: React.FC<DashboardModalProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const { addDashboard } = useDashboard();

  const colors: { [key: string]: string } = {
    green: "#7AC555",
    purple: "#760DDE",
    orange: "#FFA500",
    blue: "#76A5EA",
    pink: "#E876EA",
  };

  const postDashboard = (
    e: React.FormEvent<HTMLFormElement>,
    color: string,
  ) => {
    e.preventDefault();
    const colorCode = colors[color];
    addDashboard({ title: inputValue, color: colorCode });
    setInputValue(""); // 입력 필드 초기화
    onClose(); // 모달 닫기
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <CreateDashBoard
      isOpen={isOpen}
      title={"새로운 대시보드"}
      value={inputValue}
      subTitle={"대시보드 이름"}
      placeholder={"대시보드 이름"}
      createButtonText={"생성"}
      cancelButtonText={"취소"}
      onClose={onClose}
      onSubmit={postDashboard}
      onChange={handleChangeInput}
    />
  );
};

export default DashboardModal;
