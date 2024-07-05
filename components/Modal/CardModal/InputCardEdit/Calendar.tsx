import { ko } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CalendarProps {
  subTitle: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export default function Calendar({ subTitle, onChange, value }: CalendarProps) {
  // value가 존재하고 ISO 8601 형식이 아닌 경우, ISO 8601 형식으로 변환
  const formattedValue = value
    ? new Date(value).toISOString().slice(0, 16)
    : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className='mt-[18px] flex flex-col gap-[10px] tablet:mt-[26px]'>
      <div className='text-[16px] font-medium tablet:text-[18px]'>
        {subTitle} <span className='text-violet-20'>{"*"}</span>
      </div>
      <div className='relative flex h-[42px] items-center rounded-[6px] border-[1px] border-gray-30 p-4 active:border-[1px] active:border-violet-20 tablet:h-[48px]'>
        <input
          type='datetime-local'
          value={value}
          onChange={onChange}
          className='w-full'
        ></input>
      </div>
    </div>
  );
}
