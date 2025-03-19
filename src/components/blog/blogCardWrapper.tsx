import { db } from "@/db";
import { blogTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import BlogCard from "./blogCard";

export default async function BlogCardWrapper({
  page = 1,
  pageSize = 10,
}: {
  page?: number;
  pageSize?: number;
}) {
  const blogData = await db
    .select()
    .from(blogTable)
    .orderBy(desc(blogTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return (
    <div className="m-4 grid w-full grid-cols-1 gap-2 md:grid-cols-3">
      {blogData ? (
        blogData.map((entry) => <BlogCard key={entry.id} data={entry} />)
      ) : (
        <h1>No blog data yet!</h1>
      )}
      {blogData ? (
        blogData.map((entry) => <BlogCard key={entry.id} data={entry} />)
      ) : (
        <h1>No blog data yet!</h1>
      )}
      {blogData ? (
        blogData.map((entry) => <BlogCard key={entry.id} data={entry} />)
      ) : (
        <h1>No blog data yet!</h1>
      )}
    </div>
  );
}
