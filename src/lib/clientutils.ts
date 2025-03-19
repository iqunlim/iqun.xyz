"use client";
// Rem units to pixels for dynamic style sizing
export function remToPixels(rem: number) {
  if (!document) return 0;
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
