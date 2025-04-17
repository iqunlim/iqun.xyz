"use server";
import { db } from "@/db";
import { blogTable } from "@/db/schema";
import { count, desc, eq, isNull, and } from "drizzle-orm";

export async function getPaginatedBlogPosts(
  page: number = 1,
  pageSize: number = 6,
) {
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
  return db
    .select({ count: count() })
    .from(blogTable)
    .where(isNull(blogTable.deletedAt));
}

export async function getPostBySlug(slug: string) {
  return db
    .select()
    .from(blogTable)
    .where(and(eq(blogTable.slug, slug), isNull(blogTable.deletedAt)));
}
