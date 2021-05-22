import { getPost, getPostIds, Post } from '@/modules/blog';
import React from 'react';

interface BlogPostProps {
  post: Post;
}

const BlogPost: React.VFC<BlogPostProps> = (props) => {
  return <div>test</div>;
};
export default BlogPost;

export async function getStaticPaths() {
  const paths = getPostIds();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post: Post = await getPost(params.id);
  return {
    props: {
      post
    }
  };
}
