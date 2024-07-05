interface TextareaProps {
  subTitle: string;
  placeholder?: string;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textData: string;
}

export default function Textarea({
  subTitle,
  placeholder,
  textData,
  handleTextChange,
}: TextareaProps) {
  return (
    <div className='mt-[18px] flex flex-col gap-[10px] tablet:mt-[26px]'>
      <div className='text-[16px] font-medium tablet:text-[18px]'>
        {subTitle} <span className='text-violet-20'>{"*"}</span>
      </div>
      <div className='relative flex h-[84px] w-full items-center rounded-[6px] border-[1px] border-gray-30 p-4 active:border-[1px] active:border-violet-20 tablet:h-[96px]'>
        <textarea
          placeholder={placeholder}
          className='h-full w-full text-[14px] font-normal tablet:text-[16px]'
          value={textData}
          onChange={handleTextChange}
        />
      </div>
    </div>
  );
}

