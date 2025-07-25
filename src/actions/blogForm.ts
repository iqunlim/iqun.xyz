"use server";
import "server-only";
import kebabCase from "lodash/kebabCase";
import { z } from "zod";

import { VerifyUserAuthorized } from "@/lib/supabase/server";
import { ValidateParsedFileObject } from "@/lib/utils";
import putFileAndGetUrl from "@/lib/files/R2";

import { DeleteDraftByDraftId } from "./drafts";
import { InsertBlogPost } from "./blog";

import av2 from "@/assets/av2.png";
import { getPostBySlug } from "@/lib/repository/blog";

type FormState = {
  message: string;
};

const FormDataValidation = z.object({
  draftId: z.string().min(1),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
  image: z.any().optional(), //TODO: when zod 4 update: Do file validation here
  slug: z.string().optional(),
  altText: z.string().optional(),
  tags: z.preprocess((obj) => {
    if (Array.isArray(obj)) {
      return obj;
    } else if (typeof obj === "string") {
      return obj.length === 0 ? [] : obj.split(","); // an empty string parses to [""] which is BAD
    } else {
      return [];
    }
  }, z.array(z.string())),
});

type BlogData = z.infer<typeof FormDataValidation>;

function ValidateFormData(data: FormData): BlogData {
  const formData = Object.fromEntries(data);
  return FormDataValidation.parse(formData);
}

async function UploadImageFileAndReturnUrl(data: BlogData) {
  const imageFile = ValidateParsedFileObject(data.image);
  if (imageFile) {
    const ret = await putFileAndGetUrl(data.image);
    if (!ret || ret.error) throw new Error(ret.error);
    return ret.fileUrl;
  }
  return FallbackToDefaultImage(data.slug);
}

// I Do not love this, but it seems like the best way to handle
// The case where the post already has an image and one was not
// provided in the update.
async function FallbackToDefaultImage(slug?: string) {
  if (!slug) return av2.src;
  const data = await getPostBySlug(slug);
  if (!data[0]) return av2.src;
  return data[0].image;
}

// All of the logic to go from FormDataValidatedForDatabase => BlogTableInsertType
async function AddBlogPost(newData: BlogData) {
  const imageUrl = await UploadImageFileAndReturnUrl(newData);
  // Create slug if the post is new
  // If it is old, we do not want to update the slug if possible
  const slug = newData.slug
    ? newData.slug
    : kebabCase(newData.title.toString());

  const blogInsertFormat = {
    title: newData.title,
    summary: newData.summary,
    content: newData.content,
    image: imageUrl,
    slug: slug,
    altText: newData.altText,
    tags: newData.tags,
  };

  return InsertBlogPost(blogInsertFormat)
    .then(() => DeleteDraftByDraftId(newData.draftId))
    .then(() => console.debug(`Insert Success for ${slug}`));
}

export async function PutBlogPostAction(
  _: FormState,
  data: FormData,
): Promise<FormState> {
  try {
    await VerifyUserAuthorized();
  } catch (e) {
    console.error(e);
    return {
      message:
        "There was an error with authorizing this transaction, please refresh the page and try again!",
    };
  }

  let ValidatedFormData: BlogData;
  try {
    ValidatedFormData = ValidateFormData(data);
  } catch (e) {
    console.error(e);
    return {
      message: "Error: Form Data was invalid. Please refresh the page!",
    };
  }

  try {
    await AddBlogPost(ValidatedFormData);
  } catch (e) {
    console.error(e);
    return {
      message:
        "There was an error inserting the blog post. Please refresh the page!",
    };
  }
  return {
    message: `Upload Succeeded! ${ValidatedFormData.slug ? `Post ${ValidatedFormData.slug} has been updated` : `Post has been created.`}`,
  };
}
