export default function StackBadge({
  text,
  image,
}: {
  text: string;
  image: string;
}) {
  return (
    <div className="border-accent flex h-[8rem] w-[8rem] flex-col items-center justify-center gap-2 rounded-md border md:h-[10rem] md:w-[10rem]">
      <img className="w-[5rem]" src={image} alt="golang logo" />
      <p className="text-md flex items-center justify-center lg:text-xl">
        {text}
      </p>
    </div>
  );
}
