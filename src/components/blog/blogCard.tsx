/* eslint-disable @next/next/no-img-element */
import { blogTableSelectType } from "@/db/schema";
import defaultImg from "../../app/img/av2.png";
import Link from "next/link";

export default async function BlogCard({
  data,
}: {
  data: blogTableSelectType;
}) {
  return (
    <Link
      href={`/blog/${data.id}`}
      className="bg-background-transparent border-gradient flex h-full w-full cursor-pointer flex-col gap-2 border-4 p-4"
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
          <span>{databaseDateToString(data.createdAt)}</span>
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

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

function databaseDateToString(date: string) {
  const dateObj = new Date(date);
  if (!dateObj) throw new Error("Invalid date string");
  return `${months[dateObj.getMonth()]} ${dateObj.getDay()} ${dateObj.getFullYear()}`;
}
