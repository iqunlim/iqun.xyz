"use server";
import {
  DeleteDraftByDraftId,
  DeleteDraftBySlug,
  GetAllDrafts,
  GetDraftById,
  UpsertDraft,
} from "@/action/drafts";
import { BlogTableZod } from "@/db/schema";
import { VerifyUserAuthorized } from "@/lib/supabase/server";

export async function PutToDrafts(
  id: string,
  vals: Omit<BlogTableZod, "image" | "tags" | "altText">,
) {
  //TODO: Make this in to an auth function
  await VerifyUserAuthorized();

  console.log("Put to drafts");
  UpsertDraft(id, vals);
}

export async function getDraft(id: string) {
  await VerifyUserAuthorized();
  return GetDraftById(id);
}

export async function getAllDrafts() {
  await VerifyUserAuthorized();
  return GetAllDrafts();
}

export async function deleteDraftsBySlugAction(slug: string) {
  await VerifyUserAuthorized();
  await DeleteDraftBySlug(slug);
  return;
}

export async function deleteDraftsByDraftIdAction(draftId: string) {
  await VerifyUserAuthorized();
  await DeleteDraftByDraftId(draftId);
  return;
}
