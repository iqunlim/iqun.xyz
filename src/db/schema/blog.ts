import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
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
