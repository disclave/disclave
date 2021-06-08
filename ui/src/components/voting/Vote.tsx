import React, { useEffect, useState } from "react";
import { VoteUI } from "./VoteUI";

export interface VoteProps {
  enabled: boolean;
  loading: boolean;
  votes: {
    sum: number;
    votedUp: boolean;
    votedDown: boolean;
  };
  vertical: boolean;
  onVoteUp: () => Promise<void>;
  onVoteDown: () => Promise<void>;
  onVoteRemove: () => Promise<void>;
}

export const Vote: React.VFC<VoteProps> = (props) => {
  const [sum, setSum] = useState(props.votes.sum);
  const [votedUp, setVotedUp] = useState(props.votes.votedUp);
  const [votedDown, setVotedDown] = useState(props.votes.votedDown);

  useEffect(() => {
    setSum(props.votes.sum);
    setVotedUp(props.votes.votedUp);
    setVotedDown(props.votes.votedDown);
  }, [props.votes]);

  const setState = (_sum: number, _votedUp: boolean, _votedDown: boolean) => {
    setSum(_sum);
    setVotedUp(_votedUp);
    setVotedDown(_votedDown);
  };

  const clearVotes = async () => {
    await props.onVoteRemove();
    const newSum = sum + (votedDown ? 1 : 0) - (votedUp ? 1 : 0);
    setState(newSum, false, false);
  };

  const voteUp = async () => {
    await props.onVoteUp();
    setState(sum + (votedDown ? 2 : 1), true, false);
  };

  const voteDown = async () => {
    await props.onVoteDown();
    setState(sum - (votedUp ? 2 : 1), false, true);
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
    <VoteUI
      enabled={props.enabled}
      loading={props.loading}
      sum={sum}
      votedDown={votedDown}
      votedUp={votedUp}
      vertical={props.vertical}
      onClickMinus={onClickMinus}
      onClickPlus={onClickPlus}
    />
  );
};
