/*
  작은 단위의 Comment(댓글) 창
*/

import { FC } from "react";
import UserBadge from "@/components/UserBadge";
import { CommentResponse } from "@/lib/api/types/comments";

interface CommentProps {
  comment: CommentResponse;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Comment: FC<CommentProps> = ({ comment, onEdit, onDelete }) => {
  return (
    <div className='flex items-start space-x-4'>
      <UserBadge
        nickname={comment.author.nickname}
        profileImageUrl={comment.author.profileImageUrl}
        className='h-[40px] w-[40px] tablet:h-[70px] tablet:w-[70px] desktop:h-[70px] desktop:w-[70px]'
      />
      <div className='flex-1'>
        <div className='flex items-center space-x-2'>
          <span className='font-semibold'>{comment.author.nickname}</span>
          <span className='text-sm text-gray-50'>
            {new Date(comment.createdAt).toLocaleString()}
          </span>
        </div>
        <p className='mt-1'>{comment.content}</p>
        <div className='mt-2 flex space-x-2 text-sm text-gray-50'>
          <button
            onClick={() => onEdit(comment.id)}
            className='hover:underline'
          >
            수정
          </button>
          <button
            onClick={() => onDelete(comment.id)}
            className='hover:underline'
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
