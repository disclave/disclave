import { PostPreview } from '@/modules/blog';
import React from 'react';
import { DateTimePreview } from '@disclave/ui';
import Link from 'next/link';
import { blogPostHref } from '@/pages/blog/[id]';
import { blogPostsImg } from '@/consts';

export interface BlogPostPreviewProps {
  post: PostPreview;
}

export const BlogPostPreview: React.VFC<BlogPostPreviewProps> = ({ post }) => {
  return (
    <div className="border rounded shadow hover:shadow-2xl">
      <Link href={blogPostHref(post.id)}>
        <a>
          <img
            src={post.imageSrc}
            alt={post.title}
            className="rounded-t"
            width={blogPostsImg.widht}
            height={blogPostsImg.height}
          />
          <div className="px-4 pb-3 pt-2">
            <DateTimePreview className="text-xs text-gray-400" hideTime iso={post.date} />
            <h2 className="text-2xl font-semibold">{post.title}</h2>
          </div>
        </a>
      </Link>
    </div>
  );
};
