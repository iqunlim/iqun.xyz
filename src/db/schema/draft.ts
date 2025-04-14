import { integer, pgTable, varchar, text } from "drizzle-orm/pg-core";
import { z } from "zod";

export const draftTable = pgTable("drafts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  draftId: text().notNull().unique(),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  summary: varchar({ length: 500 }).notNull(),
  slug: varchar({ length: 255 }).notNull(),
});

export const draftTableZodSchema = z.object({
  title: z
    .string()
    .min(1, "Required Field")
    .max(255, "Must be less than 255 Characters"),
  content: z.string().min(1, "Required Field"),
  summary: z
    .string()
    .min(1, "Required Field")
    .max(500, "Must be less than 500 characters. Be brief in the summary!"),
  draftId: z.string().uuid(),
  slug: z.string().nullable(),
});
