import React from "react";
import { CommentModel } from "@/components/comments/CommentModel";

export interface ListItemContentProps {
  comment: CommentModel;
}

export const ListItemContent = React.forwardRef<
  HTMLParagraphElement,
  ListItemContentProps
>((props, ref) => {
  return (
    <p
      className="text-sm whitespace-pre-wrap break-words"
      dangerouslySetInnerHTML={{ __html: props.comment.text.trim() }}
    />
  );
});
