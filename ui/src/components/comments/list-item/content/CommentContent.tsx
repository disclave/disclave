import React from "react";

export interface CommentContentProps {
  text: string;
}

export const CommentContent = React.forwardRef<
  HTMLParagraphElement,
  CommentContentProps
>(({ text }, ref) => {
  return (
    <p
      ref={ref}
      className="text-sm whitespace-pre-wrap break-words"
      dangerouslySetInnerHTML={{ __html: text.trim() }}
    />
  );
});
