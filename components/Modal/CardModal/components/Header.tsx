/*
 CardEditModal의 Header: Title
*/

import { FC } from "react";
import Button from "../../../Button";

interface HeaderProps {
  title: string;
  onClose: () => void;
}

const Header: FC<HeaderProps> = ({ title, onClose }) => (
  <div className='text-[20px] font-bold tablet:text-[24px]'>{title}</div>
);

export default Header;
