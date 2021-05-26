import { Vote } from "@/components/voting";
import { useTranslation } from "@/i18n";
import React from "react";
import { PageVotesModel } from "../models";

export interface PageVotingProps {
  enabled: boolean;
  votes: PageVotesModel;
  onVoteUp: () => Promise<void>;
  onVoteDown: () => Promise<void>;
  onVoteRemove: () => Promise<void>;
}

export const PageVoting: React.VFC<PageVotingProps> = (props) => {
  const { t } = useTranslation("voting");

  return (
    <div className="mx-auto max-w-max">
      <span className="text-sm">{t("page.do you like it")}</span>
      <div className="my-2 mx-auto max-w-max">
        <Vote
          enabled={props.enabled}
          votes={{
            sum: props.votes.sum,
            votedDown: props.votes.votedDown,
            votedUp: props.votes.votedUp,
          }}
          vertical={false}
          onVoteDown={props.onVoteDown}
          onVoteRemove={props.onVoteRemove}
          onVoteUp={props.onVoteUp}
        />
      </div>
    </div>
  );
};
