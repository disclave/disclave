import { domain } from '@/consts';
import { getPost, getPostIds, Post } from '@/modules/blog';
import { BlogPostPage } from '@/modules/layout/blog/post';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import React from 'react';

export const blogPostHref = (id: string) => `/blog/${id}`;

interface BlogPostProps {
  post: Post;
}

const BlogPost: React.VFC<BlogPostProps> = (props) => {
  const { t } = useTranslation('blog');

  const seoTitle = t('seo.title');
  const seoDescription = props.post.title;
  const seoImg = domain + props.post.imageSrc;

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        openGraph={{
          type: 'blog',
          title: seoTitle,
          description: seoDescription,
          images: [
            {
              url: seoImg
            }
          ]
        }}
      />
      <BlogPostPage post={props.post} />
    </>
  );
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
  const translationsPromise = serverSideTranslations(locale, ['blog', 'common', 'layout']);

  return {
    props: {
      post: await postPromise,
      ...(await translationsPromise)
    }
  };
};
