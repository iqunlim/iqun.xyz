export default function StackBadge({
  text,
  image,
}: {
  text: string;
  image: string;
}) {
  return (
    <div className="flex h-[calc(8rem+2px)] w-[calc(8rem+2px)] items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-purple-500 md:h-[calc(10rem+4px)] md:w-[calc(10rem+4px)]">
      <div className="bg-background z-10 flex h-[8rem] w-[8rem] flex-col items-center justify-center gap-2 rounded-md md:h-[10rem] md:w-[10rem]">
        <img
          className="max-h-[5.5rem] max-w-[5rem]"
          src={image}
          alt="golang logo"
        />
        <p className="text-md flex items-center justify-center lg:text-xl">
          {text}
        </p>
      </div>
    </div>
  );
}
