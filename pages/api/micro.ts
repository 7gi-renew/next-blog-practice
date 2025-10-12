import { client } from "../../libs/microcms";

// ブログ記事の型定義
export type BlogTypes = {
  id: string;
  title: string;
  eyecatch?: {
    url: string;
  };
};

export default async function getBlogPosts(): Promise<BlogTypes[]> {
  const data = await client.get({
    endpoint: "blogs",
    queries: {
      fields: "id,title,content,eyecatch",
      limit: 4,
    },
  });
  return data.contents;
}

export async function getBlogEntry(id: string): Promise<BlogTypes[]> {
  const data = await client.get({
    endpoint: `blogs/${id}`,
  });
  return data;
}
