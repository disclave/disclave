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
  horizontal?: boolean;
}

export const PageVotes: React.VFC<PageVotesProps> = ({ pageDetails, horizontal = false }) => {
  const { uid } = useSession();

  const urlId = {
    websiteId: pageDetails.websiteId,
    pageId: pageDetails.pageId
  };

  const onVoteDown = async () => {
    await addPageVoteDown(urlId);
  };

  const onVoteUp = async () => {
    await addPageVoteUp(urlId);
  };

  const onVoteRemove = async () => {
    await removePageVote(urlId);
  };

  return (
    <Vote
      enabled={!!uid}
      loading={false}
      votes={{
        sum: pageDetails.votes.sum,
        votedDown: pageDetails.votes.votedDown,
        votedUp: pageDetails.votes.votedUp
      }}
      vertical={!horizontal}
      onVoteDown={onVoteDown}
      onVoteUp={onVoteUp}
      onVoteRemove={onVoteRemove}
    />
  );
};
