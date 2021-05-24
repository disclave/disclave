import React from 'react';
import { Layout } from '@/modules/layout';
import { PostPreview } from '@/modules/blog';
import { BlogPostPreview } from './post-preview';
import { useTranslation } from 'next-i18next';

export interface BlogPageProps {
  posts: Array<PostPreview>;
}

export const BlogPage: React.VFC<BlogPageProps> = ({ posts }) => {
  const {t} = useTranslation('blog');

  return (
    <Layout>
      <section className="container mx-auto py-6 px-3">
        <div className="flex flex-col space-y-4 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold pb-2">{t('main section.header')}</h1>
          {posts.map((p) => (
            <BlogPostPreview key={p.id} post={p} />
          ))}
        </div>
      </section>
    </Layout>
  );
};
