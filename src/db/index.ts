import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
// import { blogTable } from "./schema";
// import fs from "fs";

export const db = drizzle(process.env.DATABASE_URL!);

// const fakeData = fs.readFileSync("./src/db/Markdown-test.txt").toString();
// const dummyData: (typeof blogTable.$inferInsert)[] = [
//   {
//     title: "Test Blog post",
//     author: "IQ",
//     content: fakeData,
//     summary:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
//     tags: [
//       "Test",
//       "Test2",
//       "Reallyasdhjkfhjkasdhlfkjaljkshdflongtag",
//       "Tag with many words",
//     ],
//   },
//   {
//     title: "Reallyreallyreallyreallyreallylongtitle",
//     author: "Reallylongauthorname Maybe with some spaces too",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
//     summary:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
//   },
// ];
