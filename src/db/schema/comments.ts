// Future TODO: Work on comments system
import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const CommentTable = pgTable("blog", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user: varchar({ length: 255 }).notNull(),
  content: varchar({ length: 300 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }),
  deletedAt: timestamp("deleted_at", { mode: "string" }),
});

export type CommentTableInsertType = typeof CommentTable.$inferInsert;
export type CommentTableSelectType = typeof CommentTable.$inferSelect;
