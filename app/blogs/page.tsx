"use client";

import React, { useEffect, useState } from "react";
import { client } from "../../libs/microcms";
import Cards from "../components/Cards";

// ブログ記事の型定義
type Props = {
  id: string;
  title: string;
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

export default function Page() {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      const data: any = await getBlogPosts();
      setBlogData(data);
      console.log(data);
    };
    fetchBlogData();
  }, []);

  return (
    <>
      <h2 className="font-bold text-2xl">ブログ記事一覧</h2>
      <div className="grid grid-cols-4 gap-4">
        {blogData.map((elem: Props) => {
          return <Cards href={`/blogs/${elem.id}`} heading={elem.title} article={false} target={false} />;
        })}
      </div>
    </>
  );
}
