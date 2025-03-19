import BlogCardWrapper from "@/components/blog/blogCardWrapper";
import Link from "next/link";

export default function RootPage() {
  return (
    <div className="m-8">
      <Link
        className="cursor-pointer underline hover:text-blue-500"
        href="/components"
      >
        Check out my components
      </Link>
      <div>
        <BlogCardWrapper page={1} pageSize={6} />
      </div>
    </div>
  );
}
