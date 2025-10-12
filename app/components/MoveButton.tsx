"use client";

import { useRouter } from "next/navigation";
import React from "react";

const MoveButton = ({ area }) => {
  const router = useRouter();

  const onClickArticle = (e) => {
    e.preventDefault;
    const dataArea = e.target.dataset.area;

    switch (dataArea) {
      case "topBlog":
        router.push("/blogs/");
        break;
      case "topQiita":
        router.push("/articles/");
        break;
    }
  };

  return (
    <button className="btn" onClick={onClickArticle} data-area={area}>
      もっと見る
    </button>
  );
};

export default MoveButton;
