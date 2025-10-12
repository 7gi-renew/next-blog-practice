import { client } from "../../libs/microcms";
import Cards from "../components/Cards";

// ブログ記事の型定義
type Props = {
  id: string;
  title: string;
  eyecatch: {
    url: string;
  };
};

async function getBlogPosts(): Promise<Props[]> {
  const data = await client.get({
    endpoint: "blogs",
    queries: {
      fields: "id,title,content",
    },
  });
  return data.contents;
}

export default async function Page() {
  const data: any = await getBlogPosts();
  const blogData = await data;

  return (
    <>
      <h2 className="font-bold text-2xl">ブログ記事一覧</h2>
      <div className="grid grid-cols-4 gap-4">
        {blogData.map((elem: Props) => {
          return <Cards href={`/blogs/${elem.id}`} heading={elem.title} article={false} target={false} thumb={elem.eyecatch.url} />;
        })}
      </div>
    </>
  );
}
