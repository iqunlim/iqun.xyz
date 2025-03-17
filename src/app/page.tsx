import Link from "next/link";

export default function RootPage() {
  return (
    <div>
      <Link
        className="cursor-pointer underline hover:text-blue-500"
        href="/components"
      >
        Check out my components
      </Link>
    </div>
  );
}
