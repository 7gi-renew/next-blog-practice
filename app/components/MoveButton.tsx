"use client";

import { useRouter } from "next/navigation";
import React from "react";

const MoveButton = ({ area, className }) => {
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
      case "BlogBack":
        router.push("/blogs/");
        break;
    }
  };

  return (
    <button className={`btn bg-blue-500 text-white hover:bg-blue-400 border-none rounded-sm ${className}`} onClick={onClickArticle} data-area={area}>
      {area === "BlogBack" && "一覧へ戻る"}
      {area === "BlogBack" || "次へ進む"}
    </button>
  );
};

export default MoveButton;
