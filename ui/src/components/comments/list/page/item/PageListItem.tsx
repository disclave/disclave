import React from "react";
import { CommentModel } from "@/components/comments/CommentModel";
import { DateTimePreview } from "@/components/date/dateTimePreview";
import { CommentVote } from "@/components/comments/list/item/vote";

export interface PageListItemProps {
  comment: CommentModel;
  authenticated: boolean;
  onVoteUp: (commentId: string) => Promise<void>;
  onVoteDown: (commentId: string) => Promise<void>;
  onVoteRemove: (commentId: string) => Promise<void>;
}

export const PageListItem: React.VFC<PageListItemProps> = (props) => {
  return (
    <div>
      <div className="mb-0.5">
        <span className="font-semibold text-sm">
          {props.comment.author.name}
        </span>
        <DateTimePreview
          className="ml-2 font-light text-xs"
          iso={props.comment.timestamp}
        />
      </div>

      <div id={props.comment.id} className="pt-32 -mt-32">
        <p
          className="text-sm whitespace-pre-wrap break-words"
          dangerouslySetInnerHTML={{ __html: props.comment.text.trim() }}
        />
      </div>

      <div className="mt-1">
        <CommentVote
          commentId={props.comment.id}
          enabled={props.authenticated}
          votes={props.comment.votes}
          onVoteUp={props.onVoteUp}
          onVoteDown={props.onVoteDown}
          onVoteRemove={props.onVoteRemove}
        />
      </div>
    </div>
  );
};
