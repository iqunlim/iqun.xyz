"use server";

import { db } from "@/db";
import { BlogTableZod } from "@/db/schema";
import { draftTable } from "@/db/schema/draft";
import { eq } from "drizzle-orm";

export async function UpsertDraft(
  id: string,
  data: Omit<BlogTableZod, "image" | "tags" | "altText">,
) {
  return db
    .insert(draftTable)
    .values({ draftId: id, ...data })
    .onConflictDoUpdate({
      target: draftTable.draftId,
      set: {
        ...data,
      },
    });
}

export async function GetAllDrafts() {
  return db.select().from(draftTable);
}

export async function GetDraftById(draftId: string) {
  return db.select().from(draftTable).where(eq(draftTable.draftId, draftId));
}

export async function DeleteDraftBySlug(slug: string) {
  return db.delete(draftTable).where(eq(draftTable.slug, slug));
}

export async function DeleteDraftByDraftId(draftId: string) {
  return db.delete(draftTable).where(eq(draftTable.draftId, draftId));
}
