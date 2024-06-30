import React from "react";
import { format } from "date-fns";
import Image from "next/image";
import Tag from "@/components/Tag/Tag";

interface Props {
  title: string;
  tags: string[];
  dueDate: string;
  assignee: {
    nickname: string;
    profileImageUrl: string | null;
  };
  imageUrl: string | null;
}

const tagColors: { background: string; color: string }[] = [
  { background: "bg-pink-bg", color: "text-pink" },
  { background: "bg-violet-10", color: "text-violet-20" },
  { background: "bg-green-bg", color: "bg-green-text" },
  { background: "bg-blue-bg", color: "bg-blue-text" },
];

const BoardCard: React.FC<Props> = ({
  title,
  tags,
  dueDate,
  assignee,
  imageUrl,
}) => {
  const { nickname, profileImageUrl } = assignee;
  const formattedDueDate = format(new Date(dueDate), "yyyy.MM.dd");

  return (
    <div className='flex min-h-[71px] w-auto flex-col gap-3 rounded-md border border-gray-30 bg-white p-3 tablet:flex-row desktop:w-314 desktop:flex-col'>
      {imageUrl && (
        <div className='h-151 w-auto tablet:h-53 desktop:h-161'>
          <img
            className='h-full w-full rounded-md tablet:w-91 desktop:w-full'
            src={imageUrl}
            alt='Card image'
          />
        </div>
      )}

      <div className='flex flex-col gap-1.5 tablet:w-full tablet:justify-between desktop:flex-col'>
        <div className='text-sm font-medium text-black-30 desktop:whitespace-normal'>
          {title}
        </div>
        <div className='tablet:flex tablet:w-full tablet:gap-2 desktop:flex-col'>
          <div>
            {tags.map((tag, index) => {
              const { background, color } = tagColors[index % tagColors.length]; // 순서대로 색상을 할당
              return (
                <Tag
                  key={tag}
                  tag={tag}
                  background={background}
                  color={color}
                />
              );
            })}
          </div>

          <div className='flex justify-between tablet:h-24 tablet:min-w-[120px] tablet:flex-auto desktop:m-0'>
            <div className='relative mr-1 flex items-center gap-1'>
              <Image
                src='../../icon/ic_calendar.svg'
                alt='달력아이콘'
                priority
                width={14}
                height={14}
                className='items-center tablet:h-18 tablet:w-18'
              />
              <p className='text-[10px] font-medium text-black-20 tablet:text-xs'>
                {formattedDueDate}
              </p>
            </div>

            {profileImageUrl ? (
              <img
                className='h-22 w-22 rounded-full'
                src={profileImageUrl}
                alt='Profile'
              />
            ) : (
              <div className='flex h-22 w-22 items-center justify-center rounded-full bg-green-10 text-[10px] font-semibold text-white tablet:h-24 tablet:w-24'>
                {nickname.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
