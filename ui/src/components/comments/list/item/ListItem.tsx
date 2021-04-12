import React from "react";
import { CommentModel } from "../../CommentModel";
import { DateTimePreview } from "@/components/date/dateTimePreview";
import { CommentVote } from "@/components/comments/list/item/vote";
import { CommentWebsiteInfo } from "@/components/comments/list/item/website";

export interface ListItemProps {
  comment: CommentModel;
  authenticated: boolean;
  showWebsite: boolean;
  onVoteUp: (commentId: string) => Promise<void>;
  onVoteDown: (commentId: string) => Promise<void>;
  onVoteRemove: (commentId: string) => Promise<void>;
}

export const ListItem: React.VFC<ListItemProps> = (props) => {
  return (
    <div>
      {props.showWebsite ? (
        <CommentWebsiteInfo className="mb-1" urlMeta={props.comment.urlMeta} />
      ) : null}

      <div>
        <span className="font-semibold text-sm">
          {props.comment.author.name}
        </span>
        <span className="ml-2 font-light text-xs">
          <DateTimePreview iso={props.comment.timestamp} />
        </span>
      </div>

      <div className="mt-1 mb-2">
        <p
          className="text-sm whitespace-pre-wrap break-words"
          dangerouslySetInnerHTML={{ __html: props.comment.text }}
        />
      </div>

      <div>
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
