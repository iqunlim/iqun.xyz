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
