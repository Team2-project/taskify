/*
  작은 단위의 Comment(댓글) 창
*/

import { FC, useState } from "react";
import UserBadge from "@/components/UserBadge";
import { CommentResponse } from "@/lib/api/types/comments";
import fetcher from "@/lib/api/fetcher";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import Button from "@/components/Button";

interface CommentProps {
  comment: CommentResponse;
}
const Comment: FC<CommentProps> = ({ comment }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(comment.content);
  const queryClient = useQueryClient();

  const editMutation = useMutation<void, Error, { content: string }>({
    mutationFn: async ({ content }) => {
      await fetcher({
        url: `comments/${comment.id}`,
        method: "PUT",
        data: { content },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", comment.cardId],
      });
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("Failed to edit comment", error);
    },
  });

  const deleteMutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      await fetcher({
        url: `comments/${comment.id}`,
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", comment.cardId],
      });
    },
    onError: (error) => {
      console.error("Failed to delete comment", error);
    },
  });

  const handleEdit = () => {
    editMutation.mutate({ content: editedContent });
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

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
        {isEditing ? (
          <div>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className='w-full resize-none rounded border border-gray-30 p-2'
            />
            <div className='mt-2 flex space-x-2'>
              <Button
                onClick={handleEdit}
                className='border border-gray-30 bg-white p-[2px] text-purple'
              >
                저장
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                className='border border-gray-30 bg-white p-[2px] text-red'
              >
                취소
              </Button>
            </div>
          </div>
        ) : (
          <p className='mt-1 whitespace-pre-wrap break-words'>
            {comment.content}
          </p>
        )}
        {!isEditing && (
          <div className='mt-2 flex space-x-2 text-sm text-gray-50'>
            <button
              onClick={() => setIsEditing(true)}
              className='hover:underline'
            >
              수정
            </button>
            <button onClick={handleDelete} className='hover:underline'>
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
