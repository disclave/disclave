import React from 'react';
import { Layout } from '@/modules/layout';
import { Post } from '@/modules/blog';
import { DateTimePreview } from '@disclave/ui';

export interface BlogPostPageProps {
  post: Post;
}

export const BlogPostPage: React.VFC<BlogPostPageProps> = ({ post }) => {
  return (
    <Layout>
      <section className="container mx-auto my-6 px-3">
        <div className="max-w-5xl mx-auto">
          <DateTimePreview
            className="text-sm text-gray-400"
            hideTime
            iso={post.date}
            width={1200}
            height={600}
          />
          <h1 className="text-3xl font-semibold mb-6">{post.title}</h1>
          <img src={post.imageSrc} alt={post.title} className="rounded-t" />
          <p className="my-6" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </div>
      </section>
    </Layout>
  );
};
