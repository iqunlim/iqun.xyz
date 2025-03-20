import { faker } from "@faker-js/faker";
import { db } from "..";
import { blogTable } from "../schema";

export function createFakeBlogs(
  count: number,
): (typeof blogTable.$inferInsert)[] {
  return Array.from({ length: count }, () => ({
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(5, "\n\n"),
    summary: faker.lorem.sentences(2),
    image: faker.image.url(),
    altText: faker.lorem.words(5),
    tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      faker.lorem.word(),
    ),
  }));
}

export async function addTestDataToDatabase() {
  try {
    await db.insert(blogTable).values(createFakeBlogs(12));
  } catch (error) {
    console.log(error);
  }
}

function main() {
  addTestDataToDatabase();
}
main();
