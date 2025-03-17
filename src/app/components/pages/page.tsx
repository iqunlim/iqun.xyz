"use client";
import { Button } from "@/components/ui/button";
import { Pages } from "@/lib/projectdata";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function WebPageEmbeds() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageIframe />
    </Suspense>
  );
}

function PageIframe() {
  const searchParams = useSearchParams();
  const whichPage = searchParams?.get("page");
  if (!whichPage) return <h1>NOT FOUND</h1>; // TODO: fallthrough page

  const entry = Pages.filter((entry) => entry.internalName === whichPage);
  if (entry.length < 1 || !entry) return <h1>NOT FOUND</h1>;
  return (
    <div className="h-[calc(100vh-200px)] w-full rounded-md px-5">
      <div className="my-2 flex gap-2">
        <Button variant="outline">
          <a href={entry[0].src}>View Page directly on the website</a>
        </Button>
        {entry[0].gh && (
          <Button variant="outline" asChild>
            <a href={entry[0].gh} target="#">
              View source code
            </a>
          </Button>
        )}
      </div>
      <iframe className="h-full w-full" src={entry[0].src}></iframe>
    </div>
  );
}
