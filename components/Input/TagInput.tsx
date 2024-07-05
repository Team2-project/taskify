import { useCallback, useEffect, useState } from "react";

interface TagInputProps {
  subTitle: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTagChange: (newTags: string[]) => void;
}

const colors = ["bg-pink-bg", "bg-orange-10", "bg-blue", "bg-green"];

export default function TagInput({
  subTitle,
  placeholder,
  value,
  onChange,
  handleTagChange,
}: TagInputProps) {
  const [hashtag, setHashtag] = useState<string>(""); // onChange로 관리할 문자열
  const [hashArr, setHashArr] = useState<
    { id: number; tag: string; color: string }[]
  >([]);
  // 해시태그를 담을 배열

  useEffect(() => {
    if (value) {
      setHashArr(
        value.split(",").map((tag, index) => ({
          id: index,
          tag: tag.trim(),
          color: colors[Math.floor(Math.random() * colors.length)], // 랜덤 색상 할당
        })),
      );
    }
  }, [value]);

  const onKeyUp = useCallback(
    (e: any) => {
      if (e.keyCode === 13 && e.target.value.trim() !== "") {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const newTag = {
          id: Date.now(),
          tag: e.target.value,
          color: randomColor,
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
            className={`mr-[6px] flex items-center justify-center gap-[5px] rounded-[6px] ${item.color} tablet:gap-[7px]`}
          >
            <div className='text-[10px] font-normal tablet:text-[12px]'>
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

