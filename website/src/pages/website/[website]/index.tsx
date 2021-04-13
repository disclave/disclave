import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { CommentModel, CommentUrlMeta, encodeUrl } from '@disclave/client';
import { getCommentService, getUserCookie } from '@disclave/server';
import { WebsitePage } from '@/modules/pages/website';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { initServer } from '@/modules/server';

export const websiteHrefFromMeta = (urlMeta: CommentUrlMeta) =>
  websiteHref(urlMeta.websiteId + urlMeta.pageId, true);
export const websiteHref = (url: string, encoded: boolean = false) =>
  websiteHrefRaw + (encoded ? url : encodeUrl(url));
export const websiteHrefRaw = '/website/';

export const getServerSideProps: GetServerSideProps<WebsiteProps> = async (context) => {
  await initServer();
  const { website } = context.query;

  const userCookie = getUserCookie(context.req);
  const service = getCommentService();

  const commentsPromise = service.getComments(website as string, userCookie?.uid);
  const translationsPromise = serverSideTranslations(context.locale, [
    'common',
    'layout',
    'website'
  ]);

  return {
    props: {
      comments: await commentsPromise,
      serverSideUid: userCookie?.uid || null,
      ...(await translationsPromise)
    }
  };
};

interface WebsiteProps {
  comments: Array<CommentModel>;
  serverSideUid: string | null;
}

const Website: React.FC<WebsiteProps> = (props) => {
  const router = useRouter();
  const website = router.query.website as string;

  return (
    <WebsitePage website={website} comments={props.comments} serverSideUid={props.serverSideUid} />
  );
};
export default Website;
