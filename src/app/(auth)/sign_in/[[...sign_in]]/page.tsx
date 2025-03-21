import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex h-svh w-svw items-center justify-center">
      <SignIn />
    </main>
  );
}
