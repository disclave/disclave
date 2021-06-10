import React from "react";
import { Vote } from "@/components/voting";
import { CommentVotesModel } from "@/types";

export interface CommentVoteProps {
  commentId: string;
  enabled: boolean;
  votes: CommentVotesModel;
  onVoteUp: (commentId: string) => Promise<void>;
  onVoteDown: (commentId: string) => Promise<void>;
  onVoteRemove: (commentId: string) => Promise<void>;
}

export const CommentVote: React.VFC<CommentVoteProps> = (props) => {
  const clearVotes = async () => {
    await props.onVoteRemove(props.commentId);
  };

  const voteUp = async () => {
    await props.onVoteUp(props.commentId);
  };

  const voteDown = async () => {
    await props.onVoteDown(props.commentId);
  };

  return (
    <Vote
      enabled={props.enabled}
      loading={false}
      votes={{
        sum: props.votes.sum,
        votedDown: props.votes.votedDown,
        votedUp: props.votes.votedUp,
      }}
      vertical={false}
      onVoteDown={voteDown}
      onVoteRemove={clearVotes}
      onVoteUp={voteUp}
    />
  );
};
