import { getSortedPostsPreview, PostPreview } from '@/modules/blog';
import React from 'react';

interface BlogProps {
  postsPreview: PostPreview[];
}

const Blog: React.VFC<BlogProps> = (props) => {
  return <div>test</div>;
};
export default Blog;

export async function getStaticProps() {
  const postsPreview: PostPreview[] = getSortedPostsPreview();
  return {
    props: {
      postsPreview
    }
  };
}
