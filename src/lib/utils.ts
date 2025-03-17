"use client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Rem units to pixels for dynamic style sizing
export function remToPixels(rem: number) {
  if (!document) return 0;
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function* DelayGenerator() {
  let test = 0.25;
  while (true) {
    yield test;
    test += 0.25;
  }
}
