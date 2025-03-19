import { db } from "@/db";
import { blogTable } from "@/db/schema";
import { count, desc } from "drizzle-orm";
import BlogCard from "./blogCard";
import Paginator from "./paginator";

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

  const blogCount = await db.select({ count: count() }).from(blogTable);

  return (
    <div>
      <div className="m-8 grid w-full grid-cols-1 gap-2 md:grid-cols-3">
        {blogData ? (
          blogData.map((entry) => <BlogCard key={entry.id} data={entry} />)
        ) : (
          <h1>No blog data yet!</h1>
        )}
      </div>
      <Paginator
        className="mx-8 h-fit w-fit"
        total={blogCount[0].count}
        currentPage={page}
        limit={pageSize}
      />
    </div>
  );
}
