"use client";
import BlogContent from "@/app/blog/[[...id]]/content";
import BlogForm from "@/components/admin/BlogForm";
import BlogCard from "@/components/blog/blogCard";
import { blogTableInsertType } from "@/db/schema";
import { kebabCase } from "lodash";
import Link from "next/link";
import React, { useState } from "react";

export default function BlogEditPage({
  blogData,
  draftId,
}: {
  blogData: Partial<blogTableInsertType>;
  draftId: string;
}) {
  const [formValues, setFormValues] =
    useState<Partial<blogTableInsertType>>(blogData);

  const [draftIdState] = useState(
    draftId !== "" ? draftId : crypto.randomUUID(),
  );

  if (!blogData)
    return (
      <h1>
        Blog post not found.
        <Link
          className="text-purple-500 underline hover:text-purple-300"
          href="/blog"
        >
          Return...
        </Link>
      </h1>
    );
  return (
    <div className="flex gap-8 p-4">
      <div className="w-1/2">
        <BlogForm
          formInitialState={blogData}
          setFormStateValues={setFormValues}
          draftIdState={draftIdState}
        />
      </div>
      <div className="flex w-1/2 flex-col items-center gap-8">
        <h1>Preview</h1>
        <div className="h-fit w-[450px]">
          <h1 className="w-full text-center">Card</h1>
          <BlogCard data={BlogCardPreviewData(formValues)} />
        </div>
        <div className="flex h-fit w-full flex-col items-center justify-center p-4">
          <h1>Page</h1>
          <BlogContent
            className="border-gradient w-full border-2"
            data={BlogContentPreviewData(formValues)}
          />
        </div>
      </div>
    </div>
  );
}

function BlogCardPreviewData(data: Partial<blogTableInsertType>) {
  return {
    ...data,
    createdAt: new Date().toISOString(),
  };
}

function BlogContentPreviewData(data: Partial<blogTableInsertType>) {
  return {
    title: data.title || "",
    slug: kebabCase(data.title || ""),
    content: data.content || "",
    summary: data.summary || "",
    image: data.image || null,
    altText: data.altText || null,
    tags: [], // TODO
    id: 1,
    createdAt: new Date().toISOString(),
    updatedAt: null,
    deletedAt: null,
  };
}
