import React from 'react';
import { Layout } from '@/modules/layout';
import { Post } from '@/modules/blog';
import { DateTimePreview } from '@disclave/ui';
import { DisclaveComments } from '@disclave/react-plugin';
import { blogPostsImg } from '@/consts';
import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';
import { Image } from './components';

const components = {
  Link: (props) => (
    <Link href={props.href}>
      <a className="text-primary font-semibold hover:underline">{props.children}</a>
    </Link>
  ),
  h2: (props) => <h2 className="text-2xl" {...props} />,
  p: (props) => <p className="my-5" {...props} />,
  Image: (props) => <Image {...props} />
};

export interface BlogPostPageProps {
  post: Post;
}

export const BlogPostPage: React.VFC<BlogPostPageProps> = ({ post }) => {
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
          <div className="my-6">
            <MDXRemote {...post.mdxSource} components={components} />
          </div>
          <div>
            <DisclaveComments />
          </div>
        </div>
      </section>
    </Layout>
  );
};
