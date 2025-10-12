export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import Cards from "./components/Cards";
import getBlogPosts, { BlogTypes } from "../pages/api/micro";
import MoveButton from "./components/MoveButton";

type article = {
  url: string;
  title: string;
  elem: string;
  date: string;
};

export default async function Page() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API_URL}/api/qiita_top`);
  const articles = await res.json();
  const qiitaData = await articles.data;

  const posts: any = await getBlogPosts();
  const microData = await posts;

  return (
    <>
      <div className="mb-[36px]">
        <h2 className="font-bold text-2xl">個人記事</h2>
        <div className="grid grid-cols-4 gap-4">
          {qiitaData.map((elem: article) => {
            return <Cards href={elem.url} heading={elem.title} article={true} target={true} />;
          })}
        </div>
        <MoveButton area="topQiita" />
      </div>
      <div>
        <h2 className="font-bold text-2xl">ブログ記事</h2>
        <div className="grid grid-cols-4 gap-4">
          {microData.slice(0, 4).map((elem: BlogTypes) => {
            return <Cards href={`/blogs/${elem.id}`} heading={elem.title} article={false} target={false} />;
          })}
        </div>
        <MoveButton area="topBlog" />
      </div>
    </>
  );
}
