import { PageDetailsModel } from '@disclave/client';
import { PageVotes } from '@/modules/pages/votes';
import React from 'react';
import { useTranslation } from 'next-i18next';

export interface IframeVoteProps {
  pageDetails: PageDetailsModel;
}

export const IframeVote: React.VFC<IframeVoteProps> = (props) => {
  const { t } = useTranslation('iframe');

  return (
    <div className="mx-auto max-w-max">
      <span className="text-sm">{t('vote.do you like it')}</span>
      <div className="my-2 mx-auto max-w-max">
        <PageVotes pageDetails={props.pageDetails} horizontal />
      </div>
    </div>
  );
};
