import { FC } from "react";
import { CommentsResponse } from "@/lib/api/types/comments";
import Comment from "./Comment";

interface CommentsListProps {
  commentsResponse: CommentsResponse;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const CommentsList: FC<CommentsListProps> = ({
  commentsResponse,
  onEdit,
  onDelete,
}) => {
  return (
    <div className='mt-[20px] space-y-[20px]'>
      {commentsResponse.comments.map((comment) => (
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

export default CommentsList;
