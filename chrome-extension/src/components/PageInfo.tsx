import { PageDetailsModel } from "@disclave/client";
import { PageVoting } from "@disclave/ui";
import * as React from "react";

export interface PageInfoProps {
  enabled: boolean;
  pageDetails: PageDetailsModel | null;
  pageActions: {
    addVoteUp: () => Promise<void>;
    addVoteDown: () => Promise<void>;
    removeVote: () => Promise<void>;
  };
}

export const PageInfo: React.VFC<PageInfoProps> = ({
  enabled,
  pageDetails,
  pageActions,
}) => {
  return (
    <PageVoting
      enabled={enabled}
      loading={!pageDetails}
      votes={{
        sum: pageDetails?.votes.sum ?? 0,
        votedDown: pageDetails?.votes.votedDown ?? false,
        votedUp: pageDetails?.votes.votedUp ?? false,
      }}
      onVoteDown={pageActions.addVoteDown}
      onVoteRemove={pageActions.removeVote}
      onVoteUp={pageActions.addVoteUp}
    />
  );
};
