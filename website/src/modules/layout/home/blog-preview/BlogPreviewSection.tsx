import React from 'react';
import { useTranslation } from 'next-i18next';
import { Button } from '@disclave/ui';
import { SectionHeader } from '../components';
import { PostPreview } from '@/modules/blog';
import { blogHref } from '@/pages/blog';
import { MainPreview, SecondaryPreview } from './post-preview';

export interface BlogPreviewSectionProps {
  className?: string;
  posts: Array<PostPreview>;
}

export const BlogPreviewSection: React.VFC<BlogPreviewSectionProps> = (props) => {
  const { t } = useTranslation(['home', 'common']);

  const mainPost = props.posts[0];
  const otherPosts = props.posts.slice(1, props.posts.length);

  return (
    <section className={props.className}>
      <SectionHeader>{t('blog.title')}</SectionHeader>

      <div className="my-8">
        <MainPreview post={mainPost} />
      </div>

      <div className="my-8">
        {otherPosts.map((post) => (
          <SecondaryPreview key={post.id} post={post} />
        ))}
      </div>

      <Button href={blogHref()} outlined>
        {t('common:buttons.view all')}
      </Button>
    </section>
  );
};
