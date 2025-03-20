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

// function MarkdownRenderer({ markdownText }: { markdownText: string}) {
//   const renderedHTML = marked.parse(markdownText)

//   return (
//     {renderedHTML}
//   )
// }
