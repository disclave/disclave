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
