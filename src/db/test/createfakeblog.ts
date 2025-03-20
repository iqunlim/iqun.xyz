import { faker } from "@faker-js/faker";
import { db } from "..";
import { blogTable } from "../schema";
import fs from "fs";

function randomNumber() {
  return Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
}

export function createFakeBlogs(
  count: number,
): (typeof blogTable.$inferInsert)[] {
  return Array.from({ length: count }, () => {
    const title = faker.lorem.words(4) + " " + randomNumber();
    return {
      title: title,
      slug: faker.helpers.slugify(title),
      content: faker.lorem.paragraphs(5, "\n\n"),
      summary: faker.lorem.sentences(2),
      image: faker.image.url(),
      altText: faker.lorem.words(5),
      tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        faker.lorem.word(),
      ),
    };
  });
}

export function pullMDTestData() {
  const mdFile = fs.readFileSync("./src/db/test/Markdown-test.txt", "utf-8");

  const testData = {
    title: "Markdown test file",
    slug: "markdown-test-file",
    content: mdFile,
    summary: "Lorem",
    tags: ["Test", "Test2"],
  };
  return testData;
}

export async function addTestDataToDatabase() {
  const fakeBlogs = createFakeBlogs(20);
  const data = Object.values(fakeBlogs).map((val) => val);
  data.push(pullMDTestData());
  try {
    await db.insert(blogTable).values(data);
  } catch (error) {
    console.log(error);
  }
}

// function main() {
//   addTestDataToDatabase();
// }
// main();
