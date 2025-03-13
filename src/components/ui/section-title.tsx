import { JSX } from "react";

export default function SectionTitle({
  className,
  children,
}: {
  className?: string;
  children: JSX.Element | string;
}) {
  return (
    <h1
      className={`text-foreground drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8) flex justify-center py-8 text-5xl underline underline-offset-8 ${className}`}
    >
      {children}
    </h1>
  );
}
