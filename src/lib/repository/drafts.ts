"use server";
import { db } from "@/db";
import { draftTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllDrafts() {
  return db.select().from(draftTable);
}

export async function getDraftById(draftId: string) {
  return db.select().from(draftTable).where(eq(draftTable.draftId, draftId));
}
