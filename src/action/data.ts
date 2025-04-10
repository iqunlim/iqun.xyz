"use server";
import { db } from "@/db";
// import { getGlobalTag, getIdTag } from "@/db/cache/cacheTags";
import { blogTable } from "@/db/schema";
import { count, desc, eq, isNull, and, sql } from "drizzle-orm";
// import { cacheTag } from "next/dist/server/use-cache/cache-tag";

// Seeing how the "use cache" directive might work for async function output from the database
// https://nextjs.org/docs/app/api-reference/directives/use-cache for more information

export async function getPaginatedBlogPosts(
  page: number = 1,
  pageSize: number = 6,
) {
  // "use cache";
  // cacheTag(getIdTag("blogTable", `${page}-${pageSize}`));
  return db
    .select()
    .from(blogTable)
    .where(isNull(blogTable.deletedAt))
    .orderBy(desc(blogTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function getAllBlogPosts() {
  return db
    .select()
    .from(blogTable)
    .where(isNull(blogTable.deletedAt))
    .orderBy(desc(blogTable.createdAt));
}

export async function getPostCount() {
  // "use cache";
  // cacheTag(getGlobalTag("blogCount"));
  return db
    .select({ count: count() })
    .from(blogTable)
    .where(isNull(blogTable.deletedAt));
}

export async function getPostBySlug(slug: string) {
  // "use cache";
  // cacheTag(getGlobalTag("blogTable"));
  return db
    .select()
    .from(blogTable)
    .where(and(eq(blogTable.slug, slug), isNull(blogTable.deletedAt)));
}

export async function deletePostBySlug(slug: string) {
  await db
    .update(blogTable)
    .set({ deletedAt: sql`NOW()` })
    .where(eq(blogTable.slug, slug));
}
