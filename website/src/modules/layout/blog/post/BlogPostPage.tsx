import React from 'react';
import { Layout } from '@/modules/layout';
import { Post } from '@/modules/blog';
import { DateTimePreview } from '@disclave/ui';
import { DisclaveComments } from '@disclave/react-plugin';
import styles from './BlogPostPage.module.css';
import classNames from 'classnames';
import { blogPostsImg } from '@/consts';

export interface BlogPostPageProps {
  post: Post;
}

export const BlogPostPage: React.VFC<BlogPostPageProps> = ({ post }) => {
  const contentClassName = classNames('my-6', styles.blogContent);

  return (
    <Layout>
      <section className="container mx-auto my-6 px-3">
        <div className="max-w-3xl mx-auto">
          <DateTimePreview className="text-sm text-gray-400" hideTime iso={post.date} />
          <h1 className="text-3xl font-semibold mb-6">{post.title}</h1>
          <img
            src={post.imageSrc}
            alt={post.title}
            className="rounded"
            width={blogPostsImg.width}
            height={blogPostsImg.height}
          />
          <div
            className={contentClassName}
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
          <div>
            <DisclaveComments />
          </div>
        </div>
      </section>
    </Layout>
  );
};
