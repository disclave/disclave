import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { initServer } from '@/modules/server';
import { getPageRankingService, getUserCookie } from '@disclave/server';
import { RankingPageModel } from '@disclave/client';
import React from 'react';
import { TopRatedPages } from '@/modules/layout/pages/top-rated';

export const topRatedPagesHref = () => '/pages/top-rated';

export const getServerSideProps: GetServerSideProps<TopRatedProps> = async (context) => {
  await initServer();
  const userCookie = getUserCookie(context.req);
  const service = getPageRankingService();

  const config = {
    limit: 100, // TODO: add pagination
    commentsMinVoteSum: 0,
    pageMinVoteSum: 1,
    websiteId: null,
    excludePageId: null
  };
  const pagesPromise = service.getTopRatedPages(config, userCookie?.uid);
  const translationsPromise = serverSideTranslations(context.locale, ['common', 'layout', 'pages']);

  return {
    props: {
      pages: await pagesPromise,
      limit: config.limit,
      minPagesVoteSum: config.pageMinVoteSum,
      minCommentsVoteSum: config.commentsMinVoteSum,
      serverSideUid: userCookie ? userCookie.uid : null,
      ...(await translationsPromise)
    }
  };
};

interface TopRatedProps {
  pages: Array<RankingPageModel>;
  limit: number;
  minPagesVoteSum: number;
  minCommentsVoteSum: number;
}

const TopRated: React.VFC<TopRatedProps> = (props) => {
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
