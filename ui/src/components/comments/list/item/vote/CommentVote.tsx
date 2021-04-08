import React from "react";
import { CommentVotes } from "../../../CommentModel";
import classNames from "classnames";

export interface CommentVoteProps {
  enabled: boolean;
  votes: CommentVotes;
  onVoteUp: () => Promise<void>;
  onVoteDown: () => Promise<void>;
  onVoteRemove: () => Promise<void>;
}

export const CommentVote: React.VFC<CommentVoteProps> = (props) => {
  const defaultBtnClasses = classNames(
    "rounded w-6 h-6",
    "leading-6 text-xl font-bold",
    "bg-gray-200",
    "focus:outline-none",
    { hidden: !props.enabled }
  );

  const upBtnClasses = classNames(defaultBtnClasses, {
    "text-green-600 hover:text-white hover:bg-green-600": !props.votes.votedUp,
    "text-white bg-green-600": props.votes.votedUp,
  });

  const downBtnClasses = classNames(defaultBtnClasses, {
    "text-red-600 hover:text-white hover:bg-red-600": !props.votes.votedDown,
    "text-white bg-red-600": props.votes.votedDown,
  });

  const sumClasses = classNames("font-semibold", {
    "font-bold": props.votes.votedDown || props.votes.votedUp,
    "text-green-600": props.votes.sum > 0,
    "text-red-600": props.votes.sum < 0,
  });

  return (
    <div className="flex flex-row items-center space-x-2">
      <button className={upBtnClasses}>+</button>
      <div className={sumClasses}>{props.votes.sum}</div>
      <button className={downBtnClasses}>-</button>
    </div>
  );
};
