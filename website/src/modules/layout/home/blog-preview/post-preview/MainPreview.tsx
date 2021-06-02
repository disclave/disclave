import { DateTimePreview } from '@disclave/ui';
import { blogPostsImg } from '@/consts';
import { PostPreview } from '@/modules/blog';
import { blogPostHref } from '@/pages/blog/[id]';
import Link from 'next/link';
import React from 'react';
import classNames from 'classnames';

export interface MainPreviewProps {
  post: PostPreview;
}

export const MainPreview: React.VFC<MainPreviewProps> = ({ post }) => {

  const textWrapperClassNames = classNames(
    'absolute bottom-0 left-0 right-0',
    'px-4 pb-3 pt-2',
    'rounded-b bg-white bg-opacity-90'
  );

  return (
    <div className="rounded hover:shadow">
      <Link href={blogPostHref(post.id)}>
        <a>
          <div className="relative rounded-b">
            <img
              src={post.imageSrc}
              alt={post.title}
              className="rounded"
              width={blogPostsImg.width}
              height={blogPostsImg.height}
            />
            <div className={textWrapperClassNames}>
              <DateTimePreview className="text-sm text-gray-500" hideTime iso={post.date} />
              <h2 className="text-md sm:text-lg">{post.title}</h2>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
