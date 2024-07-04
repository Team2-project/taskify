import { useState } from "react";
import { dropButton } from "../list";

interface DropDownProps {
  subTitle: string;
  placeholder?: string;
  columnsData?: { id: number; title: string }[];
  onColumnSelect?: (columnId: number, columnTitle: string) => void;
}

export default function DropDownColumn({
  subTitle,
  placeholder,
  columnsData = [],
  onColumnSelect,
}: DropDownProps) {
  const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null);
  const [selectedColumnTitle, setSelectedColumnTitle] = useState<string>(
    placeholder || "",
  );
  const [dropOpen, setDropOpen] = useState<boolean>(false);

  const handleColumnSelect = (columnId: number, columnTitle: string) => {
    setSelectedColumnId(columnId);
    setSelectedColumnTitle(columnTitle);
    setDropOpen(false); // 컬럼 선택 후 드롭다운 닫기
    if (onColumnSelect) {
      onColumnSelect(columnId, columnTitle);
    }
  };

  return (
    <div className='mt-[18px] flex w-full flex-col gap-[10px] tablet:mt-[26px]'>
      <div className='text-[16px] font-medium tablet:text-[18px]'>
        {subTitle}
      </div>
      <div className='relative flex h-[42px] w-full items-center rounded-[6px] border-[1px] border-gray-30 p-4 active:border-[1px] active:border-violet-20 tablet:h-[48px]'>
        <button
          type='button'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDropOpen((prev) => !prev);
          }}
          className='flex w-full items-center justify-between'
        >
          <div className='text-[14px] font-normal tablet:text-[16px]'>
            {selectedColumnTitle}
          </div>
          {dropOpen ? dropButton.open : dropButton.close}
        </button>
        {dropOpen && (
          <div className='absolute left-0 right-0 top-full z-[10] rounded-b-[6px] border border-gray-20 bg-white shadow-lg'>
            <ul>
              {columnsData.map((column) => (
                <li
                  key={column.id}
                  className={`hover:bg-gray-100 cursor-pointer px-4 py-2 ${column.id === selectedColumnId ? "bg-gray-100" : ""}`}
                  onClick={() => handleColumnSelect(column.id, column.title)}
                >
                  {column.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
