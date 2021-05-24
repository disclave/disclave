import { getPost, getPostIds, Post } from '@/modules/blog';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

interface BlogPostProps {
  post: Post;
}

const BlogPost: React.VFC<BlogPostProps> = (props) => {
  return <div>test</div>;
};
export default BlogPost;

export const getStaticPaths = async () => {
  const paths = getPostIds();
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async ({ params, locale }) => {
  const postPromise = getPost(params.id);
  const translationsPromise = serverSideTranslations(locale, ['common', 'layout']);

  return {
    props: {
      post: await postPromise,
      ...(await translationsPromise)
    }
  };
};
