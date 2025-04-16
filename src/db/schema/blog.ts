import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { z } from "zod";

export const blogTable = pgTable("blog", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull().unique(),
  content: text().notNull(),
  summary: varchar({ length: 500 }).notNull(),
  image: text(),
  altText: varchar({ length: 255 }),
  //https://orm.drizzle.team/docs/guides/empty-array-default-value#postgresql
  tags: text()
    .array()
    .default(sql`'{}'::text[]`),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }),
  deletedAt: timestamp("deleted_at", { mode: "string" }),
});

export type blogTableInsertType = typeof blogTable.$inferInsert;
export type blogTableSelectType = typeof blogTable.$inferSelect;

export const blogTableZodSchema = z.object({
  title: z
    .string()
    .min(1, "Required Field")
    .max(255, "Must be less than 255 Characters"),
  slug: z.string(),
  content: z.string().min(1, "Required Field"),
  summary: z
    .string()
    .min(1, "Required Field")
    .max(500, "Must be less than 500 characters. Be brief in the summary!"),
  altText: z.string().max(255).optional(),
  image: z.any(), // TODO: Better than this. It's causing a huge amount of headache to validate
  tags: z.array(z.string()).default([]),
});

export type BlogTableZod = z.infer<typeof blogTableZodSchema>;
