import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import { Post, PostPreview, RawPost } from './models';

const postsDirectory = path.join(process.cwd(), 'src/blog-posts');

export const getSortedPostsPreview = () => {
  const rawPosts = readRawPosts();
  return rawPosts
    .map(
      (p: RawPost): PostPreview => ({
        id: p.id,
        title: p.title,
        date: p.date,
        imageSrc: p.imageSrc
      })
    )
    .sort((a: PostPreview, b: PostPreview) => comparator(a.date, b.date));
};

export const getPost = async (id: string): Promise<Post> => {
  const rawPost = readRawPostFile(id);
  const contentHtml = await markdownToHtml(rawPost.content);

  const contentText = contentHtml.replace(/<[^>]*>?/gm, '');
  const seoDescription = `${contentText.substr(0, 160)}...`;

  return {
    id,
    title: rawPost.title,
    date: rawPost.date,
    imageSrc: rawPost.imageSrc,
    contentHtml: contentHtml,
    seoDescription: seoDescription
  };
};

export const getPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, '')
    }
  }));
};

const readRawPosts = (): Array<RawPost> => {
  const fileNames = fs.readdirSync(postsDirectory);

  const rawPosts = fileNames.map((f) => readRawPostFile(f.replace(/\.md$/, '')));
  return rawPosts;
};

const readRawPostFile = (id: string): RawPost => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
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
    imageSrc: data.imageSrc!!
  };
};

const markdownToHtml = async (markdown: string): Promise<string> => {
  const processed = await remark().use(html).process(markdown);
  return processed.toString();
};

function comparator<T extends string | number>(a: T, b: T): number {
  if (a == b) return 0;
  else if (a < b) return 1;
  else return -1;
}
