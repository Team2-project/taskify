import { useCallback, useState } from "react";

interface TagInputProps {
  subTitle: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTagChange: (newTags: string[]) => void;
}

export default function TagInput({
  subTitle,
  placeholder,
  value,
  onChange,
  handleTagChange,
}: TagInputProps) {
  const [hashtag, setHashtag] = useState<string | "">(""); // onChange로 관리할 문자열
  const [hashArr, setHashArr] = useState<string[] | []>([]); // 해시태그를 담을 배열

  const onKeyUp = useCallback(
    (e: any) => {
      if (typeof window !== "undefined") {
        const HashWrapOuter = document.querySelector("#modal");
        const existingDivs = (HashWrapOuter as Element).querySelectorAll(
          ".flex",
        );
        if (existingDivs.length >= 5) {
          alert("최대 5개의 해시태그만 추가할 수 있습니다.");
          return;
        }
        const HashWrapInner = document.createElement("div");
        HashWrapInner.classList.add(
          "flex",
          "h-21",
          "text-[14px]",
          "tablet:text-[16px]",
          "bg-blue",
          "rounded-[6px]",
          "mr-[3px]",
        );

        HashWrapInner.addEventListener("click", () => {
          HashWrapOuter?.removeChild(HashWrapInner);
          console.log(HashWrapInner.innerHTML);
          const newHashArr = hashArr.filter(
            (hashtag) => hashtag !== HashWrapInner.innerHTML,
          );
          setHashArr(newHashArr);
          handleTagChange(newHashArr);
        });

        if (e.keyCode === 13 && e.target.value.trim() !== "") {
          console.log("Enter Key 입력됨!", e.target.value);
          HashWrapInner.innerHTML = e.target.value;
          HashWrapOuter?.appendChild(HashWrapInner);
          const newHashArr = [...hashArr, e.target.value];
          setHashArr(newHashArr);
          handleTagChange(newHashArr);
          setHashtag("");
        }
      }
    },
    [hashtag, hashArr, handleTagChange],
  );

  const onChangeHashtag = (e: any) => {
    setHashtag(e.target.value);
  };

  return (
    <div className='mt-[18px] flex flex-col gap-[10px] tablet:mt-[26px]'>
      <div className='text-[16px] font-medium tablet:text-[18px]'>
        {subTitle}
      </div>
      <div className='relative flex h-[42px] w-full items-center rounded-[6px] border-[1px] border-gray-30 p-3 active:border-[1px] active:border-violet-20 tablet:h-[48px]'>
        <div className='flex w-full flex-wrap'>
          <input
            placeholder={placeholder}
            className='w-full text-[14px] font-normal tablet:text-[16px]'
            value={hashtag}
            onChange={onChangeHashtag}
            onKeyUp={onKeyUp}
          />
          <div
            id='modal'
            className='absolute top-10 flex w-full flex-wrap'
          ></div>
        </div>
      </div>
    </div>
  );
}

