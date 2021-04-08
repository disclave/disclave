import React, { useState } from "react";
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
  const [sum, setSum] = useState(props.votes.sum);
  const [votedUp, setVotedUp] = useState(props.votes.votedUp);
  const [votedDown, setVotedDown] = useState(props.votes.votedDown);

  const defaultBtnClasses = classNames(
    "rounded w-6 h-6",
    "leading-6 text-xl font-bold",
    "bg-gray-200",
    "focus:outline-none",
    { hidden: !props.enabled }
  );

  const upBtnClasses = classNames(defaultBtnClasses, {
    "text-green-600 hover:text-white hover:bg-green-600": !votedUp,
    "text-white bg-green-600": votedUp,
  });

  const downBtnClasses = classNames(defaultBtnClasses, {
    "text-red-600 hover:text-white hover:bg-red-600": !votedDown,
    "text-white bg-red-600": votedDown,
  });

  const sumClasses = classNames("font-semibold", {
    "font-bold": votedDown || votedUp,
    "text-green-600": sum > 0,
    "text-red-600": sum < 0,
  });

  const clearVotes = async () => {
    await props.onVoteRemove();

    if (votedUp) setSum(sum - 1);
    if (votedDown) setSum(sum + 1);
    setVotedUp(false);
    setVotedDown(false);
  };

  const voteUp = async () => {
    await props.onVoteUp();

    if (votedDown) setSum(sum + 2);
    else setSum(sum + 1);

    setVotedDown(false);
    setVotedUp(true);
  };

  const voteDown = async () => {
    await props.onVoteDown();

    if (votedUp) setSum(sum - 2);
    else setSum(sum - 1);

    setVotedUp(false);
    setVotedDown(true);
  };

  const onClickPlus = async () => {
    if (votedUp) await clearVotes();
    else await voteUp();
  };

  const onClickMinus = async () => {
    if (votedDown) await clearVotes();
    else await voteDown();
  };

  return (
    <div className="flex flex-row items-center space-x-2">
      <button className={upBtnClasses} onClick={onClickPlus}>
        +
      </button>
      <div className={sumClasses}>{sum}</div>
      <button className={downBtnClasses} onClick={onClickMinus}>
        -
      </button>
    </div>
  );
};
