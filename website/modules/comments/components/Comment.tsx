import React from "react";
import {CommentModel} from "../CommentModel";

interface CommentProps {
  comment: CommentModel
}

export const Comment: React.FC<CommentProps> = ({comment}) => {
  return (
    <p>
      {comment.text}
    </p>
  )
}