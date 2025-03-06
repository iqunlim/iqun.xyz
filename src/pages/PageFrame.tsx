import { Button } from "@/components/ui/button";

export default function PageIframe({ src, gh }: { src: string; gh?: string }) {
  return (
    <div className="h-[calc(100vh-200px)] w-full rounded-md px-5">
      <div className="my-2 flex gap-2">
        <Button variant="outline">
          <a href={src}>View Page directly on the website</a>
        </Button>
        {gh && (
          <Button variant="outline" asChild>
            <a href={gh} target="#">
              View source code
            </a>
          </Button>
        )}
      </div>
      <iframe className="h-full w-full" src={src}></iframe>
    </div>
  );
}
