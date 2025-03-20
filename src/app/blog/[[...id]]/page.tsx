import { db } from "@/db";
import { blogTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function Page({
  params,
}: {
  params: Promise<{ id?: string[] }>;
}) {
  const id = (await params).id?.[0];
  if (!id) return; // TODO: better fallthrough than this
  const data = await db.select().from(blogTable).where(eq(blogTable.slug, id));
  if (!data[0]) return;

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="w-full border-x-2 p-10 lg:w-2/3">
        <article className="prose prose-purple lg:prose-xl dark:prose-invert">
          <h1 className="w-full text-center underline">{data[0].title}</h1>
          <h1>Summary</h1>
          <p>{data[0].summary}</p>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {data[0].content}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
}

// Date and update date
// break
// Summary ?
// Title
// Content
// Tags at the bottom
