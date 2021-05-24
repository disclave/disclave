import React from 'react';
import { Layout } from '@/modules/layout';
import { PostPreview } from '@/modules/blog';

export interface BlogPageProps {
  posts: Array<PostPreview>;
}

export const BlogPage: React.VFC<BlogPageProps> = ({ posts }) => {
  return (
    <Layout>
      <div>Blog</div>
    </Layout>
  );
};
