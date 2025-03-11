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
      className={`text-foreground flex justify-center py-4 text-5xl underline underline-offset-8 ${className}`}
    >
      {children}
    </h1>
  );
}
