import { blogTableInsertType } from "@/db/schema";
import BlogEditPage from "@/components/client/admin/EditPage";
import { getPostBySlug } from "@/lib/repository/blog";
import { getDraftById } from "@/lib/repository/drafts";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ draft: string }>;
}) {
  const { slug } = await params;
  const blogData = await extractBlogDataFromParams(slug?.[0]);
  const draftId = (await searchParams).draft;
  const draftData = await extractDraftId(draftId);

  // Not sure if this is the best approach, but we
  // Get the blog data from the database, and then append
  // any draft data we might have
  // This should handle drafts for older posts
  // as well as drafts for new posts
  const combinedData = { ...blogData[0], ...draftData[0] };

  return (
    <BlogEditPage blogData={combinedData} draftId={draftId ? draftId : ""} />
  );
}

async function extractBlogDataFromParams(
  slug?: string,
): Promise<Partial<blogTableInsertType>[]> {
  if (!slug) return [{}];
  return getPostBySlug(slug);
}

async function extractDraftId(draftId?: string) {
  if (!draftId) return [{}];
  return getDraftById(draftId);
}
