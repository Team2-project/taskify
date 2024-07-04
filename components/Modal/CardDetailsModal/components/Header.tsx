/*
  CardDetailsModal의 Header: title + CardDropdown + CloseButton
*/
import { FC } from "react";
import CloseButton from "./CloseButton";
import CardDropdown from "./CardDropdown";

interface HeaderProps {
  title: string;
  cardId: number;
  dashboardId: number;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const Header: FC<HeaderProps> = ({
  title,
  cardId,
  dashboardId,
  onEdit,
  onDelete,
  onClose,
}) => (
  <div className='mb-4 flex items-center justify-between'>
    <h2 className='word-wrap w-full whitespace-normal text-xl font-semibold tablet:w-[420px] desktop:w-[420px]'>
      {title}
    </h2>
    <div className='flex space-x-2'>
      <CardDropdown
        dashboardId={dashboardId}
        cardId={cardId}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <CloseButton onClose={onClose} />
    </div>
  </div>
);

export default Header;
