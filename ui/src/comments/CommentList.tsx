import * as React from "react";
import { CommentModel } from "./CommentModel";
import { Comment } from "./Comment";

export interface CommentListProps {
  comments: CommentModel[];
}

export const CommentList: React.VFC<CommentListProps> = ({ comments }) => {
  return (
    <div>
      <div>
        {comments.map((c) => (
          <Comment comment={c} />
        ))}
      </div>
      <div>Add comment or login/register</div>
    </div>
  );
};
