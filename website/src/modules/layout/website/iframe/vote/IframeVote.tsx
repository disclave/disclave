import {
  addPageVoteDown,
  addPageVoteUp,
  PageDetailsModel,
  removePageVote,
  useSession
} from '@disclave/client';
import React from 'react';
import { PageVoting } from '@disclave/ui';

export interface IframeVoteProps {
  pageDetails: PageDetailsModel;
}

export const IframeVote: React.VFC<IframeVoteProps> = ({ pageDetails }) => {
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
    <PageVoting
      enabled={!!uid}
      votes={{
        sum: pageDetails.votes.sum,
        votedDown: pageDetails.votes.votedDown,
        votedUp: pageDetails.votes.votedUp
      }}
      onVoteDown={onVoteDown}
      onVoteRemove={onVoteRemove}
      onVoteUp={onVoteUp}
    />
  );
};
