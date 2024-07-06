import { useCallback, useState } from "react";

interface TagInputProps {
  value?: string;
  subTitle: string;
  placeholder?: string;
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
  value,
  subTitle,
  placeholder,
  onChange,
  handleTagChange,
}: TagInputProps) {
  const [hashtag, setHashtag] = useState<string>("");
  const [hashArr, setHashArr] = useState<
    { id: number; tag: string; bgColor: string; textColor: string }[]
  >([]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (e.currentTarget.value.trim() !== "") {
          if (hashArr.length >= 5) {
            alert("최대 5개의 해시태그만 추가할 수 있습니다.");
            return;
          }
          const color = colors[Math.floor(Math.random() * colors.length)];
          const newTag = {
            id: Date.now(),
            tag: e.currentTarget.value,
            bgColor: color.bgColor,
            textColor: color.textColor,
          };
          const newHashArr = [...hashArr, newTag];
          setHashArr(newHashArr);
          handleTagChange(newHashArr.map((item) => item.tag));
          setHashtag("");
        }
      }
    },
    [hashArr, handleTagChange],
  );

  const onChangeHashtag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(e.target.value);
    if (onChange) onChange(e);
  };

  const removeTag = (idToRemove: number) => {
    const newHashArr = hashArr.filter((tag) => tag.id !== idToRemove);
    setHashArr(newHashArr);
    handleTagChange(newHashArr.map((item) => item.tag));
  };

  return (
    <div className='mt-[18px] flex flex-col gap-[10px] tablet:mt-[26px]'>
      <div className='text-[16px] font-medium tablet:text-[18px]'>
        {subTitle}
      </div>
      <div
        id='modal'
        className='relative flex h-[42px] w-full items-center justify-center rounded-[6px] border-[1px] border-gray-30 p-3 tablet:h-[48px]'
      >
        <div className='flex w-full flex-nowrap items-center gap-[6px] overflow-hidden'>
          {hashArr.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-center gap-[5px] rounded-[6px] px-[7px] ${item.bgColor} ${item.textColor} tablet:gap-[7px]`}
              style={{
                maxWidth: "150px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              onClick={() => removeTag(item.id)}
            >
              <div
                className='text-[10px] font-normal tablet:text-[12px]'
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {item.tag}
              </div>
              <span className='cursor-pointer font-semibold'>&times;</span>
            </div>
          ))}
          {hashArr.length < 5 && (
            <input
              placeholder={placeholder}
              className='flex-grow text-[10px] font-normal outline-none tablet:text-[12px]'
              value={hashtag}
              onChange={onChangeHashtag}
              onKeyDown={onKeyDown}
            />
          )}
        </div>
      </div>
    </div>
  );
}
