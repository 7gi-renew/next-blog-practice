"use client";

import { useRouter } from "next/navigation";
import React from "react";

const MoveButton = ({ area, className }) => {
  const router = useRouter();

  // テキストの文字列の切り替え用変数
  let textFlag;

  if (area === "topBlog" || area === "topQiita") {
    textFlag = true;
  } else {
    textFlag = false;
  }

  const onClickArticle = (e) => {
    e.preventDefault;
    const dataArea = e.target.dataset.area;

    switch (dataArea) {
      case "topBlog":
        router.push("/blogs/");
        textFlag = true;
        break;
      case "topQiita":
        router.push("/articles/");
        textFlag = true;
        break;
      case "BlogBack":
        router.push("/blogs/");
        textFlag = false;
        break;
      case "HomeBack":
        router.push("/");
        textFlag = false;
        break;
    }
  };

  return (
    <button className={`btn bg-blue-500 text-white hover:bg-blue-400 border-none rounded-sm ${className}`} onClick={onClickArticle} data-area={area}>
      {textFlag ? "次へ進む" : "一覧へ戻る"}
    </button>
  );
};

export default MoveButton;
