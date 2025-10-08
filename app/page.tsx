"use client";

import { useEffect, useState } from "react";
import { client } from "../libs/microcms";
import { useRouter } from "next/navigation";
import Cards from "./components/Cards";
import getBlogPosts, { BlogTypes } from "../pages/api/micro";

type article = {
  url: string;
  title: string;
  elem: string;
  date: string;
};

export default function Page() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [qiitaData, setQiitaData] = useState([]);
  const [microData, setMicroData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchQiita = async () => {
      const res = await fetch(`${API_URL}/api/qiita`);
      const articles = await res.json();
      const gettingData = articles.data;
      setQiitaData(gettingData);
    };

    const fetchMicro = async () => {
      const posts: any = await getBlogPosts();
      setMicroData(posts);
    };

    fetchQiita();
    fetchMicro();
  }, []);

  const onClickArticle = (e) => {
    e.preventDefault;
    router.push("/articles/");
  };

  const onClickBlog = (e) => {
    e.preventDefault;
    router.push("/blogs/");
  };

  return (
    <>
      <div className="mb-[36px]">
        <h2 className="font-bold text-2xl">個人記事</h2>
        <div className="grid grid-cols-4 gap-4">
          {qiitaData.slice(0, 4).map((elem: article) => {
            return <Cards href={elem.url} heading={elem.title} article={true} target={true} />;
          })}
        </div>
        <button className="btn" onClick={onClickArticle}>
          もっと見る
        </button>
      </div>
      <div>
        <div className="grid grid-cols-4 gap-4">
          {microData.slice(0, 4).map((elem: BlogTypes) => {
            return <Cards href={`/blogs/${elem.id}`} heading={elem.title} article={false} target={false} />;
          })}
        </div>
        <button className="btn" onClick={onClickBlog}>
          もっと見る
        </button>
      </div>
    </>
  );
}
