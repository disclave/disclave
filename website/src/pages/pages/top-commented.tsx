import { GetServerSideProps } from 'next';
import React from 'react';
import { TopCommentedPages } from '@/modules/layout/pages/top-commented';
import { PageUrl } from '@/PageUrl';
import { getTopCommentedPagesSSP, TopCommentedPagesProps } from '@/modules/server/pages';

export const topCommentedPagesHref: PageUrl = () => '/pages/top-commented';

export const getServerSideProps: GetServerSideProps<TopCommentedPagesProps> = async ({
  req,
  locale
}) => {
  const props = await getTopCommentedPagesSSP(req, locale!, ['common', 'layout', 'pages']);
  return {
    props
  };
};

const TopCommented: React.VFC<TopCommentedPagesProps> = (props) => {
  return (
    <TopCommentedPages
      pages={props.pages}
      pagesLimit={props.limit}
      minCommentsVoteSum={props.commentsMinVoteSum}
    />
  );
};
export default TopCommented;
