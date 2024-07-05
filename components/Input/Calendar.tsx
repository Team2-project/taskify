import { ko } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CalendarProps {
  subTitle: string;
  handleDateChange: (date: Date | null) => void;
  startDate: Date | null;
}

export default function Calendar({
  subTitle,
  handleDateChange,
  startDate,
}: CalendarProps) {
  const handleColor = (time: Date) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  return (
    <div className='mt-[18px] flex flex-col gap-[10px] tablet:mt-[26px]'>
      <div className='text-[16px] font-medium tablet:text-[18px]'>
        {subTitle} <span className='text-violet-20'>{"*"}</span>
      </div>
      <div className='relative flex h-[42px] items-center rounded-[6px] border-[1px] border-gray-30 p-4 active:border-[1px] active:border-violet-20 tablet:h-[48px]'>
        <DatePicker
          showTimeSelect
          timeClassName={handleColor}
          showIcon
          toggleCalendarOnIconClick
          dateFormat='yyyy-MM-dd HH:mm'
          selected={startDate}
          locale={ko}
          onChange={(date) => handleDateChange(date)}
          className='text-[14px] font-light tablet:text-[16px]'
          withPortal
          placeholderText='날자를 선택해주세요'
        />
      </div>
    </div>
  );
}

