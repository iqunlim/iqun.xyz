import { db } from "@/db";
import { blogTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import BlogContent from "./content";

export default async function Page({
  params,
}: {
  params: Promise<{ id?: string[] }>;
}) {
  const id = (await params).id?.[0];
  if (!id) return; // TODO: better fallthrough than this
  const data = await db.select().from(blogTable).where(eq(blogTable.slug, id));
  if (!data[0]) return <h1>Not found</h1>;

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <BlogContent data={data[0]} />
    </main>
  );
}
