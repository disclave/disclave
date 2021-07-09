import { GetServerSideProps } from 'next';
import React from 'react';
import { LatestCommentsPage } from '@/modules/layout/comments/latest';
import { PageUrl } from '@/PageUrl';
import { getLatestCommentsSSP, LatestCommentsProps } from '@/modules/server/comments';

export const latestCommentsHref: PageUrl = () => '/comments/latest';

export const getServerSideProps: GetServerSideProps<LatestCommentsProps> = async ({
  req,
  locale
}) => {
  const props = await getLatestCommentsSSP(req, locale!, ['comments', 'common', 'layout']);
  return {
    props
  };
};

const LatestComments: React.VFC<LatestCommentsProps> = (props) => {
  return (
    <LatestCommentsPage
      comments={props.comments}
      commentsLimit={props.commentsLimit}
      minVoteSum={props.minVoteSum}
    />
  );
};
export default LatestComments;
