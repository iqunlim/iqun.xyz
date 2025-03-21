import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>TODO</h1>
      <Link
        className="text-purple-500 underline hover:text-purple-300"
        href=".."
      >
        Go back...
      </Link>
    </div>
  );
}
