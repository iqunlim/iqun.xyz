/* eslint-disable @next/next/no-img-element */
import { blogTableSelectType } from "@/db/schema";
import { databaseDateToString } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import defaultImg from "@/assets/av2.png";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function BlogContent({
  data,
  className,
}: {
  data: blogTableSelectType;
  className?: string;
}) {
  return (
    <div className={className}>
      <img
        className="aspect-[3/2] max-h-[400px] w-full border-b-2 object-cover"
        src={data.image || defaultImg.src}
        alt={data.altText || "Placeholder graphic"}
      />
      <article className="prose prose-purple prose-a:hover:text-purple-300 lg:prose-2xl md:prose-xl dark:prose-invert prose-pre:bg-background prose-img:m-auto p-10">
        <div className="between-flex-spacer flex text-green-500">
          <span>{databaseDateToString(data.createdAt)}</span>
          {data.updatedAt && (
            <span>{`Updated at: ${databaseDateToString(data.updatedAt)}`}</span>
          )}
        </div>
        <p>{data.summary}</p>
        <h1 className="w-full underline">{data.title}</h1>
        <ReactMarkdownWithSettings>{data.content}</ReactMarkdownWithSettings>
        <div className="flex h-8 gap-4 border-t-2 p-4">
          {data.tags?.map((tag, i) => {
            if (tag === "") return;
            return (
              <span
                key={i}
                className="flex items-center justify-center rounded-full border p-4"
              >
                {tag}
              </span>
            );
          })}
        </div>
      </article>
    </div>
  );
}

export function ReactMarkdownWithSettings({
  children,
}: {
  children: string | null | undefined;
}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {
          const { children, className, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
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
      {children}
    </ReactMarkdown>
  );
}
