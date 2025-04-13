// import { Button } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-h-fit min-h-svh">
      <div className="flex max-h-[200px] items-center justify-between gap-2 border-b-2 p-4 pr-16">
        <Link href="/admin">
          <h1 className="rounded-md border p-2 px-4 text-2xl">Admin</h1>
        </Link>
        <Link href="/sign_out">
          <Button>Sign Out</Button>
        </Link>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
