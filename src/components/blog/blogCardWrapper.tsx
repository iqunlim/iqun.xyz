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
    .offset((page - 1) * pageSize)
    .catch((error) => console.error(error));

  const blogCount = await db
    .select({ count: count() })
    .from(blogTable)
    .catch((error) => console.error(error));

  if (!blogData)
    return (
      <div className="flex items-center justify-center">
        <h1>No blog data found, please refresh the page or try again later</h1>
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {blogData ? (
          blogData.map((entry) => <BlogCard key={entry.id} data={entry} />)
        ) : (
          <h1>No blog data yet!</h1>
        )}
      </div>
      <Paginator
        total={blogCount?.[0].count || 0}
        currentPage={page}
        limit={pageSize}
      />
    </div>
  );
}
