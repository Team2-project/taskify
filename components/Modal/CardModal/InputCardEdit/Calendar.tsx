interface CalendarProps {
  subTitle: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export default function Calendar({ subTitle, onChange, value }: CalendarProps) {
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
