import { getSortedPostsPreview, PostPreview } from '@/modules/blog';
import { BlogPage } from '@/modules/layout/blog';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

interface BlogProps {
  postsPreview: Array<PostPreview>;
}

const Blog: React.VFC<BlogProps> = (props) => {
  return <BlogPage posts={props.postsPreview} />;
};
export default Blog;

export const getStaticProps = async ({ locale }) => {
  const postsPreview: Array<PostPreview> = getSortedPostsPreview();
  const translationsPromise = serverSideTranslations(locale, ['common', 'layout']);

  return {
    props: {
      postsPreview,
      ...(await translationsPromise)
    }
  };
};
