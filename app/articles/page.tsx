export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import Cards from "../components/Cards";
import MoveButton from "../components/MoveButton";

type article = {
  url: string;
  title: string;
  elem: string;
  date: string;
};

export default async function page() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API_URL}/api/qiita_all`);
  const articles = await res.json();
  const qiitaData = await articles.data;

  return (
    <>
      <h2 className="font-bold text-2xl mb-6">個人記事一覧</h2>
      <div className="grid grid-cols-4 gap-4">
        {qiitaData.map((elem: article) => {
          return <Cards href={elem.url} heading={elem.title} article={true} target={true} thumb={""} />;
        })}
      </div>
      <MoveButton className={"mt-4"} area="HomeBack" />
    </>
  );
}

page;
