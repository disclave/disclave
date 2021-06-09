import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface Post {
  id: string;
  title: string;
  date: string;
  imageSrc: string;
  mdxSource: MDXRemoteSerializeResult;
  seoDescription: string;
}
