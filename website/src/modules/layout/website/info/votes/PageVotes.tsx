import React from 'react';
import {
  addPageVoteDown,
  addPageVoteUp,
  PageDetailsModel,
  removePageVote,
  useSession
} from '@disclave/client';
import { Vote } from '@disclave/ui';

export interface PageVotesProps {
  pageDetails: PageDetailsModel;
}

export const PageVotes: React.VFC<PageVotesProps> = ({ pageDetails }) => {
  const { uid } = useSession();

  const onVoteDown = async () => {
    await addPageVoteDown(pageDetails.url);
  };

  const onVoteUp = async () => {
    await addPageVoteUp(pageDetails.url);
  };

  const onVoteRemove = async () => {
    await removePageVote(pageDetails.url);
  };

  return (
    <Vote
      enabled={!!uid}
      votes={{
        sum: pageDetails.votes.sum,
        votedDown: pageDetails.votes.votedDown,
        votedUp: pageDetails.votes.votedUp
      }}
      vertical={true}
      onVoteDown={onVoteDown}
      onVoteUp={onVoteUp}
      onVoteRemove={onVoteRemove}
    />
  );
};
