import { expect, test } from "vitest";
import { ValidateParsedFileObject } from "../lib/utils";

test("Verify this actually works if I pass something undefined", () => {
  expect(ValidateParsedFileObject(undefined)).toBe(false);
});

const dummyFile = new File(["Hello, world!"], "dummy.txt", {
  type: "text/plain",
});

test("Verify this actually validates a file", () => {
  expect(ValidateParsedFileObject(dummyFile)).toBe(true);
});

const emptyFile = new File([], "dummy.txt", {
  type: "text/plain",
});

test("No empty files", () => {
  expect(ValidateParsedFileObject(emptyFile)).toBe(false);
});
