"use client";
import Image from "next/image";

export default function StackBadge({
  text,
  image,
  alt,
}: {
  text: string;
  image: string;
  alt?: string;
}) {
  return (
    <div className="border-gradient bg-background-transparent z-10 flex h-[8rem] w-[8rem] flex-col items-center justify-center gap-2 rounded-md border md:h-[10rem] md:w-[10rem]">
      <Image width={80} height={75} src={image} alt={alt || "Stack Image"} />
      <p className="text-md flex items-center justify-center lg:text-xl">
        {text}
      </p>
    </div>
  );
}
