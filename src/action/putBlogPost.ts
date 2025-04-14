"use server";
import { getPostBySlug } from "@/action/data";
import { db } from "@/db";
import {
  blogTable,
  blogTableInsertType,
  blogTableZodSchema,
} from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { kebabCase } from "lodash";
import { z } from "zod";
import {
  deleteDraftsByDraftIdAction,
  deleteDraftsBySlugAction,
} from "@/app/admin/edit/[[...slug]]/actions";
import { VerifyUserAuthorized } from "@/lib/supabase/server";

type FormState = {
  message: string;
};

const setupForInsertToDatabaseBlogPost = z.object({
  title: z.string(),
  summary: z.string(),
  content: z.string(),
  image: z.any(),
  slug: z.string().optional(),
  altText: z.string().optional(),
  tags: z.string(),
});

export async function PutBlogPostAction(_: FormState, data: FormData) {
  await VerifyUserAuthorized();
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
  const test = data.get("image") as File;
  if (test.name === "undefined") data.delete("image");
  const formData = Object.fromEntries(data);
  const setupParse = setupForInsertToDatabaseBlogPost.safeParse(formData);
  if (!setupParse.success) {
    console.error(setupParse.error);
    return {
      message: "Invalid user data",
    };
  }

  let ret;
  if (setupParse.data.image) {
    ret = await putR2Object(formData.image as File);
    if (!ret || ret.error)
      return { message: "Image failed to upload. Try again later..." };
  }

  const tagsString = formData.tags as string;
  const tagsArray = tagsString.split(",");

  const blogInsertFormat = {
    title: formData.title,
    summary: formData.summary,
    content: formData.content,
    image: ret?.fileUrl || undefined,
    slug: formData.slug ? formData.slug : kebabCase(formData.title.toString()),
    altText: formData.altText,
    tags: tagsArray,
  };

  const parsed = blogTableZodSchema.safeParse(blogInsertFormat);

  if (!parsed.success) {
    console.error(parsed.error);
    return {
      message: "Invalid user data",
    };
  }
  try {
    const message = await InsertOrUpdateBlogPost(parsed.data);
    if (formData.slug) {
      deleteDraftsBySlugAction(parsed.data.slug);
    } else {
      // TODO: This is bad, but it should work
      deleteDraftsByDraftIdAction((data.get("draftId") as string) || "");
    }
    return message;
  } catch (e) {
    console.error(e);
    return {
      message:
        "There was an error inserting the blog post. Please refresh the page!",
    };
  }
}

async function InsertOrUpdateBlogPost(data: blogTableInsertType) {
  const exists = await getPostBySlug(data.slug);
  if (exists.length === 0) {
    await InsertBlogPost(data);
    return { message: `Blog Post ${data.slug} Created` };
  }
  await UpdateBlogPost(data);
  return { message: `Blog post ${data.slug} updated` };
}

const apiUrl = process.env.IMG_API_URL;

async function putR2Object(file: File) {
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
  return db.insert(blogTable).values({
    title: data.title,
    slug: data.slug,
    summary: data.summary,
    content: data.content,
    image: data.image || null,
    altText: data.altText || null,
    tags: data.tags || [],
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
