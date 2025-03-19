import BlogCardWrapper from "@/components/blog/blogCardWrapper";
import Link from "next/link";
import { Suspense } from "react";

export default async function RootPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  return (
    <div className="m-8">
      <Link
        className="cursor-pointer underline hover:text-blue-500"
        href="/components"
      >
        Check out my components
      </Link>
      <div>
        <Suspense
          fallback={
            <div className="align-center flex h-svh w-svh justify-center">
              LOADING...
            </div>
          }
        >
          <BlogCardWrapper
            page={parseInt(params?.["page"] || "1")}
            pageSize={1}
          />
        </Suspense>
      </div>
    </div>
  );
}
