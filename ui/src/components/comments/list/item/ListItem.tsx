import React from "react";
import { CommentModel } from "../../CommentModel";
import { DateTimePreview } from "@/components/date/dateTimePreview";
import { CommentVote } from "@/components/comments/list/item/vote";

export interface ListItemProps {
  comment: CommentModel;
  authenticated: boolean;
  onVoteUp: () => Promise<void>;
  onVoteDown: () => Promise<void>;
  onVoteRemove: () => Promise<void>;
}

export const ListItem: React.VFC<ListItemProps> = (props) => {
  return (
    <div>
      <div>
        <span className="font-semibold">{props.comment.author.name}</span>
        <span className="ml-2 font-light text-sm">
          <DateTimePreview iso={props.comment.timestamp} />
        </span>
      </div>

      <div className="mt-1 mb-2">
        <p>{props.comment.text}</p>
      </div>

      <div>
        <CommentVote
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
