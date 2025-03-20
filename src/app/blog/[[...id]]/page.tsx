/* eslint-disable @next/next/no-img-element */
import { db } from "@/db";
import { blogTable } from "@/db/schema";
import { databaseDateToString } from "@/lib/utils";
import { eq } from "drizzle-orm";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import defaultImg from "../../img/av2.png";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
      <div className="w-full border-x-2 lg:w-2/3">
        <img
          className="aspect-[3/2] max-h-[400px] w-full border-b-2 object-cover"
          src={data[0].image || defaultImg.src}
          alt={data[0].altText || "Placeholder graphic"}
        />
        <article className="prose prose-purple prose-a:hover:text-purple-300 lg:prose-2xl md:prose-xl dark:prose-invert prose-pre:bg-background prose-img:m-auto p-10">
          <div className="flex gap-4 text-green-500">
            <span>{databaseDateToString(data[0].createdAt)}</span>
            {data[0].updatedAt && (
              <span>{`Updated at: ${databaseDateToString(data[0].updatedAt)}`}</span>
            )}
          </div>
          <p>{data[0].summary}</p>
          <h1 className="w-full underline">{data[0].title}</h1>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code(props) {
                const { children, className, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    // {...rest}
                    PreTag="div"
                    language={match[1]}
                    style={atomDark}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {data[0].content}
          </ReactMarkdown>
          <div className="flex h-8 gap-4 border-t-2 p-4">
            {data[0].tags?.map((tag, i) => (
              <span
                key={i}
                className="flex items-center justify-center rounded-full border p-4"
              >
                {tag}
              </span>
            ))}
          </div>
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
