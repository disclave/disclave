import React from 'react';
import { GetServerSideProps } from 'next';
import { CommentModel, CommentUrlMeta, encodeUrl } from '@disclave/client';
import { getCommentService } from '@disclave/server';
import { WebsitePage } from '@/modules/pages/website';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { initServer } from '@/modules/server';
import { getSession } from 'next-auth/client';

export const websiteHrefFromMeta = (urlMeta: CommentUrlMeta, commentId?: string) =>
  websiteHref(urlMeta.websiteId + urlMeta.pageId + (commentId ? `#${commentId}` : ''), true);
export const websiteHref = (url: string, encoded: boolean = false) =>
  websiteHrefRaw + (encoded ? url : encodeUrl(url));
export const websiteHrefRaw = '/website/';

export const getServerSideProps: GetServerSideProps<WebsiteProps> = async (context) => {
  await initServer();
  const session = await getSession(context);
  const service = getCommentService();

  const website = context.query.website as string;
  const commentsPromise = service.getComments(website, session?.uid);
  const translationsPromise = serverSideTranslations(context.locale, [
    'common',
    'layout',
    'website'
  ]);

  return {
    props: {
      comments: await commentsPromise,
      website: website,
      session: session,
      ...(await translationsPromise)
    }
  };
};

interface WebsiteProps {
  comments: Array<CommentModel>;
  website: string;
}

const Website: React.FC<WebsiteProps> = (props) => {
  return <WebsitePage website={props.website} comments={props.comments} />;
};
export default Website;
