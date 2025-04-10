import { blogTableInsertType } from "@/db/schema";
import BlogEditPage from "../../../../components/admin/EditPage";
import { getPostBySlug } from "@/action/data";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogData = await extractBlogDataFromParams(slug?.[0]);
  // get information here?

  return <BlogEditPage blogData={blogData[0]} />;
}

async function extractBlogDataFromParams(
  slug?: string,
): Promise<Partial<blogTableInsertType>[]> {
  if (!slug) return [{}];
  return getPostBySlug(slug);
}
