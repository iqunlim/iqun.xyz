import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { createFakeBlogs } from "./test/createfakeblog";

export const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  createFakeBlogs(12);
}

main();
