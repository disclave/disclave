import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { CommentModel, encodeUrl } from '@disclave/client';
import { getCommentService, init } from '@disclave/server';
import { WebsitePage } from '@/modules/website';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const websiteHref = (url: string) => websiteHrefRaw + encodeUrl(url);
export const websiteHrefRaw = '/website/';

export const getServerSideProps: GetServerSideProps = async (context) => {
  init(JSON.parse(process.env.FIREBASE_CERT));
  const { website } = context.query;
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
