/* eslint-disable @next/next/no-img-element */
import { blogTable } from "@/db/schema";
import defaultImg from "../../app/img/av2.png";

export default async function BlogCard({
  data,
}: {
  data: typeof blogTable.$inferSelect;
}) {
  return (
    <div className="bg-background-transparent border-gradient flex h-full w-full cursor-pointer flex-col gap-2 border-4 p-4">
      <div className="relative overflow-clip">
        <img
          className="h-full w-full object-cover"
          alt={data.altText || "Blog Post"}
          src={defaultImg.src}
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex gap-4">
          <span>{databaseDateToString(data.createdAt)}</span>
          {data.updatedAt && (
            <span>{`Updated at: ${databaseDateToString(data.updatedAt)}`}</span>
          )}
        </div>
        <h1 className="">{data.title}</h1>
        <h2>{data.summary}</h2>
        {/* <div className="flex flex-wrap gap-2">
          {data.tags.map((tag, i) => (
            <span className="rounded-full border p-1" key={i}>
              {tag}
            </span>
          ))}
        </div> */}
      </div>
    </div>
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
