import { blogTableSelectType } from "@/db/schema";
import BlogCard from "./blogCard";
import Paginator from "./Paginator";
import { getPaginatedBlogPosts, getPostCount } from "@/action/data";

export default async function BlogCardWrapper({
  page = 1,
  pageSize = 10,
}: {
  page?: number;
  pageSize?: number;
}) {
  const blogData = await getPaginatedBlogPosts(page, pageSize).catch((error) =>
    console.error(error),
  );
  const blogCount = await getPostCount().catch((error) => console.error(error));

  if (!blogData || !blogCount?.[0].count) return <BlogDataNotFound />;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <PaginatedBlogData blogData={blogData} />
      </div>
      <Paginator
        paginationUrlPrefix="?page="
        total={blogCount[0].count}
        tabsCount={6}
        currentPage={page}
        limit={pageSize}
      />
    </div>
  );
}

const BlogDataNotFound = () => {
  return (
    <div className="flex items-center justify-center">
      <h1>No blog posts found. Come back later and there might be some!</h1>
    </div>
  );
};

const PaginatedBlogData = ({
  blogData,
}: {
  blogData: blogTableSelectType[];
}) => {
  if (blogData)
    return blogData.map((entry) => <BlogCard key={entry.id} data={entry} />);
  return <h1>No blog data yet!</h1>;
};
