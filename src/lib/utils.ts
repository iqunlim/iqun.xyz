import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function* DelayGenerator() {
  let test = 0.25;
  while (true) {
    yield test;
    test += 0.25;
  }
}

/**
 * Creates a number range from start to stop inclusive
 * @param start First number
 * @param stop Last Number
 * @returns `number[]`, ex. `range(1, 5)` = `[1, 2, 3, 4, 5]`
 */
export const range = (start: number, stop: number) =>
  Array.from({ length: stop + 1 - start }, (_, i) => start + i);

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export function databaseDateToString(date: string) {
  const dateObj = new Date(date);
  if (!dateObj) throw new Error("Invalid date string");
  return `${months[dateObj.getMonth()]} ${dateObj.getDate()} ${dateObj.getFullYear()}`;
}

export function ValidateParsedFileObject(data: unknown): data is File {
  const test = data as File;
  if (test === undefined || test.name === "undefined" || test.size === 0)
    return false;
  return true;
}
