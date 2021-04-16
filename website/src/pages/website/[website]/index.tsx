import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import {
  CommentModel,
  CommentUrlMeta,
  encodeUrl,
  SessionModel,
  SessionProvider
} from '@disclave/client';
import { getAuthProvider, getCommentService, getSessionCookie } from '@disclave/server';
import { WebsitePage } from '@/modules/pages/website';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { initServer } from '@/modules/server';

export const websiteHrefFromMeta = (urlMeta: CommentUrlMeta, commentId?: string) =>
  websiteHref(urlMeta.websiteId + urlMeta.pageId + (commentId ? `#${commentId}` : ''), true);
export const websiteHref = (url: string, encoded: boolean = false) =>
  websiteHrefRaw + (encoded ? url : encodeUrl(url));
export const websiteHrefRaw = '/website/';

export const getServerSideProps: GetServerSideProps<WebsiteProps> = async (context) => {
  await initServer();
  const { website } = context.query;

  const authProvider = getAuthProvider();
  const service = getCommentService();

  const sessionCookie = getSessionCookie(context.req);
  const session = await authProvider.getSession(sessionCookie);

  const commentsPromise = service.getComments(website as string, session?.uid);
  const translationsPromise = serverSideTranslations(context.locale, [
    'common',
    'layout',
    'website'
  ]);

  return {
    props: {
      comments: await commentsPromise,
      session: session,
      ...(await translationsPromise)
    }
  };
};

interface WebsiteProps {
  comments: Array<CommentModel>;
  session: SessionModel | null;
}

const Website: React.FC<WebsiteProps> = (props) => {
  const router = useRouter();
  const website = router.query.website as string;

  return (
    <SessionProvider savedSession={props.session}>
      <WebsitePage website={website} comments={props.comments} />
    </SessionProvider>
  );
};
export default Website;
