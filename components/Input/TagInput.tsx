import { useCallback, useEffect, useState } from "react";

interface TagInputProps {
  subTitle: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTagChange: (newTags: string[]) => void;
}

const colors = [
  { bgColor: "bg-pink-bg", textColor: "text-pink" },
  { bgColor: "bg-violet-10", textColor: "text-violet-20" },
  { bgColor: "bg-[#f9eee3]", textColor: "text-[#D58D49]" },
  { bgColor: "bg-blue-bg", textColor: "text-blue-text" },
  { bgColor: "bg-green-bg", textColor: "text-green-text" },
];

export default function TagInput({
  subTitle,
  placeholder,
  value,
  onChange,
  handleTagChange,
}: TagInputProps) {
  const [hashtag, setHashtag] = useState<string>("");
  const [hashArr, setHashArr] = useState<
    { id: number; tag: string; bgColor: string; textColor: string }[]
  >([]);

  useEffect(() => {
    if (value) {
      setHashArr(
        value.split(",").map((tag, index) => {
          const color = colors[Math.floor(Math.random() * colors.length)];
          return {
            id: index,
            tag: tag.trim(),
            bgColor: color.bgColor,
            textColor: color.textColor,
          };
        }),
      );
    }
  }, [value]);

  const onKeyUp = useCallback(
    (e: any) => {
      if (e.keyCode === 13 && e.target.value.trim() !== "") {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const newTag = {
          id: Date.now(),
          tag: e.target.value,
          bgColor: color.bgColor,
          textColor: color.textColor,
        };
        const newHashArr = [...hashArr, newTag];
        setHashArr(newHashArr);
        handleTagChange(newHashArr.map((item) => item.tag));
        setHashtag("");
      }
    },
    [hashArr, handleTagChange],
  );

  const onChangeHashtag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(e.target.value);
    onChange && onChange(e);
  };

  const removeTag = (idToRemove: number) => {
    const newHashArr = hashArr.filter((item) => item.id !== idToRemove);
    setHashArr(newHashArr);
    handleTagChange(newHashArr.map((item) => item.tag));
  };

  return (
    <div className='mt-[18px] flex flex-col gap-[10px] tablet:mt-[26px]'>
      <div className='text-[16px] font-medium tablet:text-[18px]'>
        {subTitle}
      </div>
      <div className='relative flex h-[42px] w-full items-center justify-center rounded-[6px] border-[1px] border-gray-30 p-3 tablet:h-[48px]'>
        {hashArr.map((item) => (
          <div
            key={item.id}
            className={`mr-[6px] flex items-center justify-center gap-[5px] rounded-[6px] ${item.bgColor} tablet:gap-[7px]`}
          >
            <div
              className={`text-[10px] font-normal tablet:text-[12px] ${item.textColor}`}
            >
              {item.tag}
            </div>
            <span
              className='cursor-pointer font-semibold'
              onClick={() => removeTag(item.id)}
            >
              &times;
            </span>
          </div>
        ))}
        {hashArr.length > 4 || (
          <input
            placeholder={placeholder}
            className='flex-grow text-[10px] font-normal outline-none tablet:text-[12px]'
            value={hashtag}
            onChange={onChangeHashtag}
            onKeyUp={onKeyUp}
          />
        )}
      </div>
    </div>
  );
}

