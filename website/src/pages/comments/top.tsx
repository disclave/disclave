import { GetServerSideProps } from 'next';
import React from 'react';
import { TopCommentsPage } from '@/modules/layout/comments/top';
import { getTopCommentsSSP, TopCommentsProps } from '@/modules/server/comments';
import { PageUrl } from '@/PageUrl';

export const topCommentsHref: PageUrl = () => '/comments/top';

export const getServerSideProps: GetServerSideProps<TopCommentsProps> = async ({ req, locale }) => {
  const props = await getTopCommentsSSP(req, locale, ['comments', 'common', 'layout']);
  return {
    props
  };
};

const TopComments: React.VFC<TopCommentsProps> = (props) => {
  return (
    <TopCommentsPage
      comments={props.comments}
      commentsLimit={props.commentsLimit}
      minVoteSum={props.minVoteSum}
    />
  );
};
export default TopComments;
