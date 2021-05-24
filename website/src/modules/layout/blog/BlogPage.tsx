import React from 'react';
import { Layout } from '@/modules/layout';
import { PostPreview } from '@/modules/blog';
import { BlogPostPreview } from './post-preview';

export interface BlogPageProps {
  posts: Array<PostPreview>;
}

export const BlogPage: React.VFC<BlogPageProps> = ({ posts }) => {
  return (
    <Layout>
      <section className="container mx-auto py-6 px-3">
        <div className="flex flex-col space-y-2 max-w-2xl mx-auto">
          {posts.map((p) => (
            <BlogPostPreview key={p.id} post={p} />
          ))}
        </div>
      </section>
    </Layout>
  );
};
