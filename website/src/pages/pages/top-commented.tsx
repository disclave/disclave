import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { initServer } from '@/modules/server';
import { getPageRankingService, getUserCookie } from '@disclave/server';
import { RankingPageModel } from '@disclave/client';
import React from 'react';
import { TopCommentedPages } from '@/modules/layout/pages/top-commented';

export const topCommentedPagesHref = () => '/pages/top-commented';

export const getServerSideProps: GetServerSideProps<TopCommentedProps> = async (context) => {
  await initServer();
  const userCookie = getUserCookie(context.req);
  const service = getPageRankingService();

  const config = {
    limit: 100, // TODO: add pagination
    commentsMinVoteSum: 0,
    websiteId: null,
    excludePageId: null
  };
  const pagesPromise = service.getTopCommentedPages(config, userCookie?.uid);
  const translationsPromise = serverSideTranslations(context.locale, ['common', 'layout', 'pages']);

  return {
    props: {
      pages: await pagesPromise,
      limit: config.limit,
      commentsMinVoteSum: config.commentsMinVoteSum,
      serverSideUid: userCookie ? userCookie.uid : null,
      ...(await translationsPromise)
    }
  };
};

interface TopCommentedProps {
  pages: Array<RankingPageModel>;
  limit: number;
  commentsMinVoteSum: number;
}

const TopCommented: React.VFC<TopCommentedProps> = (props) => {
  return (
    <TopCommentedPages
      pages={props.pages}
      pagesLimit={props.limit}
      minCommentsVoteSum={props.commentsMinVoteSum}
    />
  );
};
export default TopCommented;
