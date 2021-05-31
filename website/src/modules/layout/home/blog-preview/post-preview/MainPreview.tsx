import { DateTimePreview } from '@disclave/ui';
import { blogPostsImg } from '@/consts';
import { PostPreview } from '@/modules/blog';
import { blogPostHref } from '@/pages/blog/[id]';
import Link from 'next/link';
import React from 'react';

export interface MainPreviewProps {
  post: PostPreview;
}

export const MainPreview: React.VFC<MainPreviewProps> = ({ post }) => {
  return (
    <div className="hover:bg-gray-100">
      <Link href={blogPostHref(post.id)}>
        <a>
          <img
            src={post.imageSrc}
            alt={post.title}
            className="rounded-t"
            width={blogPostsImg.width}
            height={blogPostsImg.height}
          />
          <div className="px-4 pb-3 pt-2">
            <DateTimePreview className="text-sm text-gray-400" hideTime iso={post.date} />
            <h2 className="text-xl">{post.title}</h2>
          </div>
        </a>
      </Link>
    </div>
  );
};
