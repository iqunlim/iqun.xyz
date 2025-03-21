"use client";
import BlogContent from "@/app/blog/[[...id]]/content";
import BlogForm from "@/components/admin/BlogForm";
import BlogCard from "@/components/blog/blogCard";
import { blogTableInsertType } from "@/db/schema";
import { kebabCase } from "lodash";
import React, { useState } from "react";

export default function Page() {
  const [formValues, setFormValues] = useState<Partial<blogTableInsertType>>(
    {},
  );
  return (
    <div className="flex gap-8 p-4">
      <div className="w-1/2">
        <BlogForm setFormStateValues={setFormValues} />
      </div>
      <div className="flex w-1/2 flex-col items-center gap-8">
        <h1>Preview</h1>
        <div className="h-fit w-[450px]">
          <h1 className="w-full text-center">Card</h1>
          <BlogCard
            data={{
              ...formValues,
              createdAt: new Date().toISOString(),
            }}
          />
        </div>
        <div className="flex h-fit w-full flex-col items-center justify-center p-4">
          <h1>Page</h1>
          <BlogContent
            className="border-gradient w-full border-2"
            data={{
              title: formValues.title || "",
              slug: kebabCase(formValues.title || ""),
              content: formValues.content || "",
              summary: formValues.summary || "",
              image: formValues.image || null,
              altText: formValues.altText || null,
              tags: [], // TODO
              id: 1,
              createdAt: new Date().toISOString(),
              updatedAt: null,
              deletedAt: null,
            }}
          />
        </div>
      </div>
    </div>
  );
}
