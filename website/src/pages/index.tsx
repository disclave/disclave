import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import React from 'react';
import { initServer } from '@/modules/server';
import { getCommentService, getPageService, getUserCookie } from '@disclave/server';
import { CommentModel, PageModel } from '@disclave/client';
import { HomePage } from '@/modules/layout/home';
import { getSortedPostsPreview, PostPreview } from '@/modules/blog';

export const homeHref = () => '/';

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  await initServer(false);
  const userCookie = getUserCookie(context.req);
  const commentService = getCommentService();
  const pageService = getPageService();

  // const testUrl = 'https://www.youtube.com/watch?v=ZS-LwWzlKdc';
  // const testUrl = 'https://youtu.be/ZS-LwWzlKdc';
  // const testUrl = 'https://disclave.com/auth/login?r=/website/&rpp=disclave.com/';
  // const testUrl = 'https://google.com';
  // const testUrl = 'https://www.google.com/search?q=test&rlz=1C1GCEB_enPL895PL895&oq=test&aqs=chrome.0.69i59l4j0j69i60l3.436j0j7&sourceid=chrome&ie=UTF-8';
  // const testUrl = 'https://www.reddit.com/r/mongodb/comments/ns13o4/need_work_with_lookup_and_group_in_aggregation/';
  // const testUrl = 'https://www.reddit.com/r/AskMen/comments/nrwoar/how_do_i_choose_a_psychiatrist/h0jvxrc?utm_source=share&utm_medium=web2x&context=3';
  // const testUrl = 'https://cloud.mongodb.com/v2/605f709ebea6557574874059#metrics/replicaSet/605f71a5314c647364777785/explorer/disclave-test/websites.pages/find';
  // const testUrl = 'https://twitter.com';
  // const testUrl = 'https://github.com/disclave/disclave';
  // const testUrl = 'https://www.unrealengine.com/en-US/blog/unreal-engine-5-is-now-available-in-early-access';
  // const testUrl = 'https://www.cyberpunk.net/en/news/37984/hotfix-1-21';
  // const testUrl = 'https://chrome.google.com/webstore/detail/disclave/flpmkapcnkmddagllidpplfimllamjbc/related';
  // const testUrl = 'https://mishalshomary.netlify.app/';
  // const testUrl = 'https://allegro.pl/oferta/hulajnoga-wyczynowa-movino-kraken-9398775962#shippingInfo'
  // const testUrl = 'https://www.amazon.pl/ELEGIANT-nagrywanie-komputerowy-przyciskiem-kompatybilny/dp/B089NVFMTF?smid=A27QO866LT4V45&pf_rd_r=4V88PJABJM1CN8EQS54J&pf_rd_p=7f4f2ba0-67fc-40e1-9243-60ce098750d6&pd_rd_r=b61604d0-52b2-43e4-a53c-fd4a14d8bb28&pd_rd_w=Nu72Z&pd_rd_wg=v2uU2&ref_=pd_gw_unk'
  // const testUrl = 'https://www.facebook.com/CyfryzacjaKPRM/posts/153016270188239'
  // const testUrl = 'https://stackoverflow.com/questions/2964645/regex-not-equal-to-string'
  // const testUrl = 'https://play.google.com/store/movies/details/Zack_Snyder_s_Justice_League?id=8J1R2lE4oWY.P'
  // const testUrl = 'https://twitter.com/elonmusk/status/1400654905149476865'
  // const testUrl = 'https://www.onet.pl/informacje/onetwiadomosci/tajemniczy-sponsor-ordo-iuris-kto-wylozyl-pieniadze-na-najnowsze-dzielo-ordo-iuris/hqtey6c,79cfc278'
  const testUrl = 'https://www.bbc.com/news/world-us-canada-57352992'
  // const testUrl = 'https://www.gry-online.pl/user.asp?ID=1237653'

  const testResult = await pageService.getPageData(testUrl);
  console.log(testResult);

  const lastestBlogPosts = getSortedPostsPreview(3);

  const topCommentsConfig = {
    limit: 5,
    minVoteSum: 1
  };
  const topCommentsPromise = commentService.getTopComments(
    topCommentsConfig.minVoteSum,
    topCommentsConfig.limit,
    userCookie?.uid
  );

  const latestCommentsConfig = {
    limit: 5,
    minVoteSum: 1
  };
  const latestCommentsPromise = commentService.getLatestComments(
    latestCommentsConfig.minVoteSum,
    latestCommentsConfig.limit,
    userCookie?.uid
  );

  const topCommentedPagesConfig = {
    limit: 6,
    commentsMinVoteSum: 1
  };
  const topCommentedPagesPromise = pageService.getTopCommentedPages(
    topCommentedPagesConfig.commentsMinVoteSum,
    topCommentedPagesConfig.limit,
    userCookie?.uid
  );

  const topRatedPagesConfig = {
    limit: 7,
    minVoteSum: 0
  };
  const topRatedPagesPromise = pageService.getTopRatedPages(
    topRatedPagesConfig.minVoteSum,
    topRatedPagesConfig.limit,
    userCookie?.uid
  );

  const translationsPromise = serverSideTranslations(context.locale, ['common', 'home', 'layout']);

  return {
    props: {
      blog: {
        latestPosts: lastestBlogPosts
      },
      topComments: {
        comments: await topCommentsPromise,
        limit: topCommentsConfig.limit,
        minVoteSum: topCommentsConfig.minVoteSum
      },
      topCommentedPages: {
        pages: await topCommentedPagesPromise,
        limit: topCommentedPagesConfig.limit,
        minCommentsVoteSum: topCommentedPagesConfig.commentsMinVoteSum
      },
      topRatedPages: {
        pages: await topRatedPagesPromise,
        limit: topRatedPagesConfig.limit,
        minVoteSum: topRatedPagesConfig.minVoteSum
      },
      latestComments: {
        comments: await latestCommentsPromise,
        limit: latestCommentsConfig.limit,
        minVoteSum: latestCommentsConfig.minVoteSum
      },
      serverSideUid: userCookie ? userCookie.uid : null,
      ...(await translationsPromise)
    }
  };
};

interface HomeProps {
  blog: {
    latestPosts: Array<PostPreview>;
  };
  topComments: {
    comments: Array<CommentModel>;
    limit: number;
    minVoteSum: number;
  };
  topCommentedPages: {
    pages: Array<PageModel>;
    limit: number;
    minCommentsVoteSum: number;
  };
  topRatedPages: {
    pages: Array<PageModel>;
    limit: number;
    minVoteSum: number;
  };
  latestComments: {
    comments: Array<CommentModel>;
    limit: number;
    minVoteSum: number;
  };
}

const Home: React.VFC<HomeProps> = (props) => {
  return (
    <HomePage
      blog={props.blog}
      topComments={props.topComments}
      topCommentedPages={props.topCommentedPages}
      topRatedPages={props.topRatedPages}
      latestComments={props.latestComments}
    />
  );
};
export default Home;
