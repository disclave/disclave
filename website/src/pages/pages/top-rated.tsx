import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { initServer } from '@/modules/server';
import { getPageService, getUserCookie } from '@disclave/server';
import { PageModel } from '@disclave/client';
import React from 'react';
import { TopRatedPages } from '@/modules/layout/pages/top-rated';

export const topRatedPagesHref = () => '/pages/top-rated';

export const getServerSideProps: GetServerSideProps<TopRatedProps> = async (context) => {
  await initServer();
  const userCookie = getUserCookie(context.req);
  const service = getPageService();

  const minVoteSum = 1;
  const limit = 100; // TODO: add pagination

  const pagesPromise = service.getTopRatedPages(minVoteSum, limit, userCookie?.uid);
  const translationsPromise = serverSideTranslations(context.locale, ['common', 'layout', 'pages']);

  return {
    props: {
      pages: await pagesPromise,
      limit,
      minVoteSum,
      serverSideUid: userCookie ? userCookie.uid : null,
      ...(await translationsPromise)
    }
  };
};

interface TopRatedProps {
  pages: Array<PageModel>;
  limit: number;
  minVoteSum: number;
}

const TopRated: React.VFC<TopRatedProps> = (props) => {
  return (
    <TopRatedPages pages={props.pages} pagesLimit={props.limit} minVoteSum={props.minVoteSum} />
  );
};
export default TopRated;
