"use client";

import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";

type article = {
  url: string;
  title: string;
  elem: string;
  date: string;
};

export default function page() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [qiitaData, setQiitaData] = useState([]);

  useEffect(() => {
    const fetchQiita = async () => {
      const res = await fetch(`${API_URL}/api/qiita`);
      const articles = await res.json();
      const gettingData = articles.data;
      setQiitaData(gettingData);
    };

    fetchQiita();
  }, []);

  return (
    <>
      <h2 className="font-bold text-2xl">個人記事一覧</h2>
      <div className="grid grid-cols-4 gap-4">
        {qiitaData.map((elem: article) => {
          return <Cards href={elem.url} heading={elem.title} article={true} target={true} />;
        })}
      </div>
    </>
  );
}

page;
