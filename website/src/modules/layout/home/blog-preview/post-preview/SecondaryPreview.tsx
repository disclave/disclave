import { DateTimePreview } from '@disclave/ui';
import { blogPostsImg } from '@/consts';
import { PostPreview } from '@/modules/blog';
import { blogPostHref } from '@/pages/blog/[id]';
import Link from 'next/link';
import React from 'react';

export interface SecondaryPreviewProps {
  post: PostPreview;
}

export const SecondaryPreview: React.VFC<SecondaryPreviewProps> = ({ post }) => {
  return (
    <div className="hover:bg-gray-100">
      <Link href={blogPostHref(post.id)}>
        <a className="flex flex-row">
          <div className="w-44">
            <img
              src={post.imageSrc}
              alt={post.title}
              className="rounded"
              width={blogPostsImg.width}
              height={blogPostsImg.height}
            />
          </div>
          <div className="pl-3">
            <DateTimePreview className="text-sm text-gray-400" hideTime iso={post.date} />
            <h2 className="text-md">{post.title}</h2>
          </div>
        </a>
      </Link>
    </div>
  );
};