import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { CommentModel, encodeUrl } from '@disclave/client';
import { getCommentService } from '@disclave/server';
import { WebsitePage } from '@/modules/pages/website';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { initServer } from '@/modules/server';

export const websiteHref = (url: string) => websiteHrefRaw + encodeUrl(url);
export const websiteHrefRaw = '/website/';

export const getServerSideProps: GetServerSideProps = async (context) => {
  await initServer();
  const { website } = context.query;

  // const userCookie = getUserCookie(context.req);
  // console.log(userCookie);

  const service = getCommentService();

  const commentsPromise = service.getComments(website as string);
  const translationsPromise = serverSideTranslations(context.locale, ['common', 'layout']);

  return {
    props: {
      comments: await commentsPromise,
      ...(await translationsPromise)
    }
  };
};

interface WebsiteProps {
  comments: Array<CommentModel>;
}

const Website: React.FC<WebsiteProps> = (props) => {
  const router = useRouter();
  const website = router.query.website as string;

  return <WebsitePage website={website} comments={props.comments} />;
};
export default Website;
