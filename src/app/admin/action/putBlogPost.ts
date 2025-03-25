"use server";
import { getPostBySlug } from "@/app/blog/data";
import { db } from "@/db";
import {
  blogTable,
  blogTableInsertType,
  blogTableZodSchema,
} from "@/db/schema";
import { randomInt } from "crypto";
import { eq, sql } from "drizzle-orm";
import { kebabCase } from "lodash";
import { z } from "zod";

type FormState = {
  message: string;
};

export async function PutBlogPostAction(_: FormState, data: FormData) {
  // Take form data and extract image file
  // Put to R2/whatever storage i want to use idk
  // Handle slug, if slug exists do not change else create slug from title
  // Handle image Url, which should be returend form the storage function
  // handle tags, which should comfortably parse in to a string if tags exists, else handle empty case == [] if needed

  // Database upload stage
  // V1
  // Check if exists based on slug
  // Update query if exists
  // Else insert query

  // V2 might be
  // Check on the form side if exists
  // Update only fields that have changed
  const formData = Object.fromEntries(data);
  const isFile = formData.image as File;
  let ret;
  if (isFile.size) {
    ret = await putR2Object(formData.image as File);
    if (!ret || ret.error)
      return { message: "Image failed to upload. Try again later..." };
  }

  const blogInsertFormat = {
    title: formData.title,
    summary: formData.summary,
    content: formData.content,
    image: ret?.fileUrl || undefined,
    slug: formData.slug ? formData.slug : kebabCase(formData.title.toString()),
    altText: formData.altText,
    tags: formData.tags === "" ? [] : JSON.parse(formData.tags as string),
  };

  console.log(blogInsertFormat.image);

  const parsed = blogTableZodSchema.safeParse(blogInsertFormat);

  if (!parsed.success) {
    return {
      message: "Invalid user data",
    };
  }

  // Check if exists
  // Update yes
  // otherwise create
  const exists = await getPostBySlug(parsed.data.slug);
  if (!exists) {
    await InsertBlogPost(parsed.data);
    return { message: "Blog Post Created" };
  }
  await UpdateBlogPost(parsed.data);
  return { message: `Blog post ${parsed.data.slug} updated` };
}

const apiUrl = "https://0e31f4dd.poring-xyz-api.pages.dev/api/v1/sign-s3";

export async function putR2Object(file: File) {
  const url = `${apiUrl}?fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(file.type)}`;
  if (!file) {
    throw new Error("No file provided");
  }
  const postData = new FormData();
  postData.append("file", file);
  postData.append("test", "Testing");
  return fetch(url, { method: "POST", body: postData })
    .then((data) => data.json())
    .then(validateApiResponse);
}

const ApiDataZod = z.object({
  url: z.string().url().optional(),
  fields: z
    .object({
      "Content-Type": z.string(),
      key: z.string(),
      "x-amz-algorithm": z.string(),
      "x-amz-credential": z.string(),
      "x-amz-date": z.string(),
      "x-amz-security-token": z.string(),
      policy: z.string(),
      "x-amz-signature": z.string(),
    })
    .optional(),
  fileUrl: z.string().url().optional(),
  error: z.string().optional(),
});

export type ApiData = z.infer<typeof ApiDataZod>;

const validateApiResponse = (ResponseData: unknown) => {
  const parsedData = ApiDataZod.parse(ResponseData);
  return parsedData;
};

async function InsertBlogPost(data: blogTableInsertType) {
  return db
    .insert(blogTable)
    .values({
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      content: data.content,
      image: data.image || null,
      altText: data.altText || null,
      tags: data.tags || [],
      createdAt: sql`NOW()`,
    })
    .onConflictDoUpdate({
      target: blogTable.slug,
      set: { slug: data.slug + randomInt(100) },
    });
}

async function UpdateBlogPost(data: blogTableInsertType) {
  return db
    .update(blogTable)
    .set({
      title: data.title,
      summary: data.summary,
      content: data.content,
      image: data.image || undefined,
      altText: data.altText || null,
      tags: data.tags || [],
      updatedAt: sql`NOW()`,
    })
    .where(eq(blogTable.slug, data.slug));
}
