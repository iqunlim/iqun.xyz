import Image from "next/image";

export default function StackBadge({
  text,
  image,
}: {
  text: string;
  image: string;
}) {
  return (
    // <div className="flex h-[calc(8rem+2px)] w-[calc(8rem+2px)] items-center justify-center rounded-md bg-transparent bg-gradient-to-br from-blue-500 to-purple-500 shadow-md md:h-[calc(10rem+4px)] md:w-[calc(10rem+4px)]">
    <div className="border-gradient bg-background-transparent z-10 flex h-[8rem] w-[8rem] flex-col items-center justify-center gap-2 rounded-md border md:h-[10rem] md:w-[10rem]">
      <Image
        className="max-h-[5.5rem] max-w-[5rem]"
        src={image}
        alt="golang logo"
      />
      <p className="text-md flex items-center justify-center lg:text-xl">
        {text}
      </p>
    </div>
    // </div>
  );
}
