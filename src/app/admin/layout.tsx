import { Button } from "@/components/ui/button";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  SignOutButton,
} from "@clerk/nextjs";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex max-h-[200px] items-center justify-between gap-2 border-b-2 p-4 pr-16">
        <h1 className="rounded-md border p-2 px-4 text-2xl">Admin</h1>
        <SignOutButton redirectUrl="/">
          <Button className="cursor-pointer"> Sign out</Button>
        </SignOutButton>
      </div>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
