import { getSortedPostsPreview, PostPreview } from '@/modules/blog';
import { BlogPage } from '@/modules/layout/blog';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

export const blogHref = () => '/blog';

interface BlogProps {
  postsPreview: Array<PostPreview>;
}

const Blog: React.VFC<BlogProps> = (props) => {
  return <BlogPage posts={props.postsPreview} />;
};
export default Blog;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const postsPreview: Array<PostPreview> = getSortedPostsPreview();
  const translationsPromise = serverSideTranslations(locale!, ['blog', 'common', 'layout']);

  return {
    props: {
      postsPreview,
      ...(await translationsPromise)
    }
  };
};
