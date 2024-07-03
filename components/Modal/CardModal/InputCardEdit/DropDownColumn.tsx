import { useState, useEffect } from "react";
import { dropButton } from "../list";

interface DropDownProps {
  subTitle: string;
  placeholder?: string;
  columnsData?: { id: number; title: string }[];
  onColumnSelect?: (columnId: number) => void;
}

export default function DropDownColumns({
  subTitle,
  placeholder,
  columnsData = [],
  onColumnSelect,
}: DropDownProps) {
  const [dropOpen, setDropOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log("columnsData:", columnsData); // 전달된 columnsData를 콘솔에 출력하여 확인
  }, [columnsData]);

  const handleColumnSelect = (columnId: number, columnTitle: string) => {
    if (onColumnSelect) {
      onColumnSelect(columnId);
    }
    setDropOpen(false);
  };

  return (
    <div className='mt-[18px] flex w-full flex-col gap-[10px] tablet:mt-[26px]'>
      <div className='text-[16px] font-medium tablet:text-[18px]'>
        {subTitle}
      </div>
      <div className='relative flex h-[42px] w-full items-center rounded-[6px] border-[1px] border-gray-30 p-4 active:border-[1px] active:border-violet-20 tablet:h-[48px]'>
        <button
          onClick={() => setDropOpen((prev) => !prev)}
          className='flex w-full items-center justify-between'
        >
          <div className='text-[14px] font-normal tablet:text-[16px]'>
            {placeholder}
          </div>
          {columnsData != null
            ? dropOpen
              ? dropButton.open
              : dropButton.close
            : null}
        </button>
        {dropOpen && (
          <div className='absolute left-0 right-0 top-full z-[10] rounded-b-[6px] border border-gray-20 bg-white shadow-lg'>
            <ul>
              {columnsData.map((column) => (
                <li
                  key={column.id}
                  className='hover:bg-gray-100 cursor-pointer px-4 py-2'
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
