import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { initServer } from '@/modules/server';
import { getPageService, getUserCookie } from '@disclave/server';
import { PageModel } from '@disclave/client';
import React from 'react';
import { TopCommentedPages } from '@/modules/layout/pages/top-commented';

export const topCommentsHref = () => '/pages/top-commented';

export const getServerSideProps: GetServerSideProps<TopCommentedProps> = async (context) => {
  await initServer();
  const userCookie = getUserCookie(context.req);
  const service = getPageService();

  const commentsMinVoteSum = 0;
  const limit = 100; // TODO: add pagination

  const pagesPromise = service.getTopCommentedPages(commentsMinVoteSum, limit);
  const translationsPromise = serverSideTranslations(context.locale, ['common', 'layout', 'pages']);

  return {
    props: {
      pages: await pagesPromise,
      serverSideUid: userCookie ? userCookie.uid : null,
      ...(await translationsPromise)
    }
  };
};

interface TopCommentedProps {
  pages: Array<PageModel>;
}

const TopCommented: React.VFC<TopCommentedProps> = (props) => {
  return <TopCommentedPages pages={props.pages} />;
};
export default TopCommented;
