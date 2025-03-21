import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
