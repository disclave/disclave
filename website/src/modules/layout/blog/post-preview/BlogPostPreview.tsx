import { PostPreview } from '@/modules/blog';
import React from 'react';
import { DateTimePreview } from '@disclave/ui';

export interface BlogPostPreviewProps {
  post: PostPreview;
}

export const BlogPostPreview: React.VFC<BlogPostPreviewProps> = ({ post }) => {
  return (
    <div className="border rounded shadow hover:shadow-lg">
      <img src={post.imageSrc} alt={post.title} className="rounded" />
      <div className="p-4">
        <DateTimePreview className="text-xs text-gray-400" hideTime iso={post.date} />
        <h2 className="text-2xl font-semibold">{post.title}</h2>
      </div>
    </div>
  );
};
