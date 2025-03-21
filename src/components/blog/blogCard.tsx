/* eslint-disable @next/next/no-img-element */
import { blogTableSelectType } from "@/db/schema";
import defaultImg from "../../app/img/av2.png";
import Link from "next/link";
import { databaseDateToString } from "@/lib/utils";

export default function BlogCard({
  data,
}: {
  data: Partial<Omit<blogTableSelectType, "id" | "deletedAt">>;
}) {
  return (
    <Link
      href={`/blog/${data.slug}`}
      className="bg-background-transparent border-gradient flex h-full w-full cursor-pointer flex-col gap-2 border-4 p-4 transition-transform hover:scale-110"
    >
      <div className="relative flex-0 overflow-clip">
        <img
          className="aspect-[3/2] h-full w-full object-cover"
          alt={data.altText || "Blog Post"}
          src={data?.image || defaultImg.src}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex gap-4 text-green-500">
          {data.createdAt && (
            <span>{databaseDateToString(data.createdAt)}</span>
          )}
          {data.updatedAt && (
            <span>{`Updated at: ${databaseDateToString(data.updatedAt)}`}</span>
          )}
        </div>
        <h1 className="pb-auto mb-8 flex-0 text-2xl break-words">
          {data.title}
        </h1>
        <p className="flex-1">{data.summary}</p>
        {/* <div className="flex flex-wrap gap-2">
          {data.tags.map((tag, i) => (
            <span className="rounded-full border p-1" key={i}>
              {tag}
            </span>
          ))}
        </div> */}
      </div>
    </Link>
  );
}
