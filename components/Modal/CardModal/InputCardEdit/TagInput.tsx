interface TagInputProps {
  subTitle: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TagInput({
  subTitle,
  placeholder,
  value,
  onChange,
}: TagInputProps) {
  return (
    <div className='mt-[18px] flex flex-col gap-[10px] tablet:mt-[26px]'>
      <div className='text-[16px] font-medium tablet:text-[18px]'>
        {subTitle}
      </div>
      <div className='relative flex h-[42px] w-full items-center rounded-[6px] border-[1px] border-gray-30 p-4 active:border-[1px] active:border-violet-20 tablet:h-[48px]'>
        <input
          placeholder={placeholder}
          className='w-full text-[14px] font-normal tablet:text-[16]'
          value={value}
          onChange={onChange}
        ></input>
      </div>
    </div>
  );
}

