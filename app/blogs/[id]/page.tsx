import dayjs from "dayjs";
import { getBlogEntry } from "../../../pages/api/micro";

type urlType = {
  height: number;
  url: string;
  width: string;
};

type EntryProps = {
  title: string;
  id: string;
  url?: string;
  eyecatch: urlType;
};

export default async function idPage({ params }) {
  const { id } = await params;
  const data: any = await getBlogEntry(id);

  const formattedDate = dayjs(data.publishedAt).format("YYYY.MM.DD");

  return (
    <>
      <div>
        <img src={data!.eyecatch.url} alt="" />
      </div>
      <h1>{data.title}</h1>
      <p>{formattedDate}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${data.content}`,
        }}
      />
    </>
  );
}
