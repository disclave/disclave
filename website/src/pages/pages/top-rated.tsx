import { GetServerSideProps } from 'next';
import React from 'react';
import { TopRatedPages } from '@/modules/layout/pages/top-rated';
import { PageUrl } from '@/PageUrl';
import { getTopRatedPagesSSP, TopRatedPagesProps } from '@/modules/server/pages';

export const topRatedPagesHref: PageUrl = () => '/pages/top-rated';

export const getServerSideProps: GetServerSideProps<TopRatedPagesProps> = async ({
  req,
  locale
}) => {
  const props = await getTopRatedPagesSSP(req, locale!, ['common', 'layout', 'pages']);
  return {
    props
  };
};

const TopRated: React.VFC<TopRatedPagesProps> = (props) => {
  return (
    <TopRatedPages
      pages={props.pages}
      pagesLimit={props.limit}
      minPagesVoteSum={props.minPagesVoteSum}
      minCommentsVoteSum={props.minCommentsVoteSum}
    />
  );
};
export default TopRated;
