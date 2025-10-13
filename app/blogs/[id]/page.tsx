import dayjs from "dayjs";
import { getBlogEntry } from "../../../pages/api/micro";
import MoveButton from "../../components/MoveButton";

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
      <div className="max-w-[480px] mx-auto">
        <div className="">
          <img src={data!.eyecatch.url} alt="" />
        </div>
        <p className="text-sm font-bold text-stone-400 mt-6 ">{formattedDate}</p>
        <h1 className="font-bold text-2xl mt-2 mb-6">{data.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: `${data.content}`,
          }}
        />
        <MoveButton area="BlogBack" className={"mt-6"} />
      </div>
    </>
  );
}
