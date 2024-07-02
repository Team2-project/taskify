/*
  CommentList: 댓글 리스트 보여주기
*/

import { FC } from "react";
import { CommentsResponse, CommentResponse } from "@/lib/api/types/comments";
import Comment from "./Comment";
import fetcher from "@/lib/api/fetcher";
import { useQuery } from "@tanstack/react-query";

interface CommentListProps {
  cardId: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const CommentList: FC<CommentListProps> = ({ cardId, onEdit, onDelete }) => {
  const { data, error, isLoading } = useQuery<CommentsResponse>({
    queryKey: ["comments", cardId],
    queryFn: () =>
      fetcher<CommentsResponse>({
        url: `comments`,
        method: "GET",
        params: { cardId, size: 10 },
      }),
  });

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>Failed to load comments</div>;
  }

  return (
    <div className='mt-[20px] space-y-[20px]'>
      {data?.comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CommentList;
