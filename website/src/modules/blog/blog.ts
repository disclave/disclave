import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { Post, PostPreview, RawPost } from './models';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

const postsDirectory = path.join(process.cwd(), 'src/blog-posts');

export const getSortedPostsPreview = (limit?: number) => {
  const rawPosts = readRawPosts();
  const sorted = rawPosts
    .map(
      (p: RawPost): PostPreview => ({
        id: p.id,
        title: p.title,
        date: p.date,
        imageSrc: p.imageSrc
      })
    )
    .sort((a: PostPreview, b: PostPreview) => comparator(a.date, b.date));

  if (!!limit) return sorted.slice(0, limit);
  else return sorted;
};

export const getPost = async (id: string): Promise<Post> => {
  const rawPost = readRawPostFile(id);
  const mdxSource = await markdownToMdxSource(rawPost.content);

  return {
    id,
    title: rawPost.title,
    date: rawPost.date,
    imageSrc: rawPost.imageSrc,
    mdxSource: mdxSource,
    seoDescription: rawPost.description
  };
};

export const getPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.mdx$/, '')
    }
  }));
};

const readRawPosts = (): Array<RawPost> => {
  const fileNames = fs.readdirSync(postsDirectory);

  const rawPosts = fileNames.map((f) => readRawPostFile(f.replace(/\.mdx$/, '')));
  return rawPosts;
};

const readRawPostFile = (id: string): RawPost => {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  return matterResultToRawPost(id, matterResult);
};

const matterResultToRawPost = (
  postId: string,
  matterResult: matter.GrayMatterFile<string>
): RawPost => {
  const content = matterResult.content;
  const data = matterResult.data;

  return {
    id: postId,
    content,
    title: data.title!!,
    date: data.date!!,
    imageSrc: data.imageSrc!!,
    description: data.description!!
  };
};

const markdownToMdxSource = async (markdown: string): Promise<MDXRemoteSerializeResult> => {
  return await serialize(markdown);
};

function comparator<T extends string | number>(a: T, b: T): number {
  if (a == b) return 0;
  else if (a < b) return 1;
  else return -1;
}
