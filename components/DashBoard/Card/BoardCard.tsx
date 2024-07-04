import React from "react";
import { format } from "date-fns";
import Image from "next/image";
import Tag from "@/components/Tag/Tag";

interface Props {
  title: string;
  tags: string[];
  dueDate: string;
  assignee: string;
  imageUrl: string | null;
  onClick: () => void;
}

const BoardCard: React.FC<Props> = ({
  title,
  tags,
  dueDate,
  assignee,
  imageUrl,
  onClick,
}) => {
  const formattedDueDate = format(new Date(dueDate), "yyyy.MM.dd");

  return (
    <div
      onClick={onClick}
      className='flex min-h-[71px] w-auto min-w-[283px] cursor-pointer flex-col gap-3 rounded-md border border-gray-30 bg-white p-3 tablet:flex-row desktop:w-314 desktop:flex-col'
    >
      {imageUrl && (
        <div className='h-auto w-auto tablet:h-53 desktop:h-auto'>
          <img
            className='h-full w-full rounded-md tablet:w-91 desktop:w-full'
            src={imageUrl}
            alt='Card image'
          />
        </div>
      )}

      <div className='flex flex-col gap-1.5 tablet:w-full tablet:justify-between desktop:flex-col'>
        <div className='text-lg font-medium text-black-30 desktop:whitespace-normal'>
          {title}
        </div>
        <div className='tablet:flex tablet:w-full tablet:gap-2 desktop:flex-col'>
          <div className='flex flex-wrap gap-1'>
            {tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>

          <div className='flex justify-between tablet:h-24 tablet:min-w-[120px] tablet:flex-auto desktop:m-0'>
            <div className='relative mr-1 flex items-center gap-1'>
              <Image
                src='/icon/ic_calendar.svg'
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

            {assignee ? (
              <div className='flex h-22 w-22 items-center justify-center rounded-full bg-green-10 text-[10px] font-semibold text-white tablet:h-24 tablet:w-24'>
                {assignee.charAt(0).toUpperCase()}
              </div>
            ) : (
              <div className='flex h-22 w-22 items-center justify-center rounded-full bg-green-10 text-[10px] font-semibold text-white tablet:h-24 tablet:w-24'>
                No Assignee
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
