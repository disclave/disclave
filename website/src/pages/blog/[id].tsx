import { blogPostsImg, domain } from '@/consts';
import { getPost, getPostIds, Post } from '@/modules/blog';
import { BlogPostPage } from '@/modules/layout/blog/post';
import { PageUrl } from '@/PageUrl';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import React from 'react';

export const blogPostHref: PageUrl = (id: string) => `/blog/${id}`;

interface BlogPostProps {
  post: Post;
}

const BlogPost: React.VFC<BlogPostProps> = (props) => {
  const { t } = useTranslation('blog');

  const seoTitle = `${props.post.title} - ${t('seo.title')}`;
  const seoDescription = props.post.seoDescription;
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
              url: seoImg,
              width: blogPostsImg.width,
              height: blogPostsImg.height,
              alt: seoTitle
            }
          ]
        }}
      />
      <BlogPostPage post={props.post} />
    </>
  );
};
export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostIds();
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  // TODO: add params validation
  const postPromise = getPost(params!.id as string);
  const translationsPromise = serverSideTranslations(locale!, ['blog', 'common', 'layout']);

  return {
    props: {
      post: await postPromise,
      ...(await translationsPromise)
    }
  };
};
