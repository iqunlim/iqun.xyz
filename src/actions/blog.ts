"use server";
import { db } from "@/db";
import { blogTable, blogTableZodValidator } from "@/db/schema";
import { VerifyUserAuthorized } from "@/lib/supabase/server";
import { eq, sql } from "drizzle-orm";

export async function deletePostBySlug(slug: string) {
  await VerifyUserAuthorized();
  await db
    .update(blogTable)
    .set({ deletedAt: sql`NOW()` })
    .where(eq(blogTable.slug, slug));
}

export async function InsertBlogPost(unparsed: unknown) {
  await VerifyUserAuthorized();
  const data = blogTableZodValidator.parse(unparsed);

  return db
    .insert(blogTable)
    .values({
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      content: data.content,
      image: data.image,
      altText: data.altText,
      tags: data.tags,
    })
    .onConflictDoUpdate({
      target: blogTable.slug,
      set: {
        title: data.title,
        summary: data.summary,
        content: data.content,
        image: data.image,
        altText: data.altText,
        tags: data.tags,
        updatedAt: sql`NOW()`,
      },
    });
}
