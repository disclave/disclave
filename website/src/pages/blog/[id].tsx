import { getPost, getPostIds, Post } from '@/modules/blog';
import { BlogPostPage } from '@/modules/layout/blog/post';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

export const blogPostHref = (id: string) => `/blog/${id}`;

interface BlogPostProps {
  post: Post;
}

const BlogPost: React.VFC<BlogPostProps> = (props) => {
  return <BlogPostPage post={props.post} />;
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
