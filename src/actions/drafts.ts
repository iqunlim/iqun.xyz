"use server";

import "server-only";
import { db } from "@/db";
import { BlogTableEntry } from "@/db/schema";
import { draftTable } from "@/db/schema/draft";
import { VerifyUserAuthorized } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";

export async function UpsertDraft(
  id: string,
  data: Omit<BlogTableEntry, "image" | "altText">,
) {
  await VerifyUserAuthorized();
  await db
    .insert(draftTable)
    .values({ draftId: id, ...data })
    .onConflictDoUpdate({
      target: draftTable.draftId,
      set: {
        ...data,
      },
    });
}

export async function DeleteDraftBySlug(slug: string) {
  await VerifyUserAuthorized();
  await db.delete(draftTable).where(eq(draftTable.slug, slug));
  return;
}

export async function DeleteDraftByDraftId(draftId: string) {
  await VerifyUserAuthorized();
  await db.delete(draftTable).where(eq(draftTable.draftId, draftId));
  return;
}
