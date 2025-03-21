import BlogCard from "./blogCard";
import Paginator from "./paginator";
import { getPaginatedBlogPosts, getPostCount } from "@/app/blog/data";

export default async function BlogCardWrapper({
  page = 1,
  pageSize = 10,
}: {
  page?: number;
  pageSize?: number;
}) {
  const blogData = await getPaginatedBlogPosts(page, pageSize);
  const blogCount = await getPostCount();

  if (!blogData)
    return (
      <div className="flex items-center justify-center">
        <h1>No blog posts found, please refresh the page or try again later</h1>
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
        paginationUrlPrefix="?page="
        total={blogCount?.[0].count || 0}
        currentPage={page}
        limit={pageSize}
      />
    </div>
  );
}
