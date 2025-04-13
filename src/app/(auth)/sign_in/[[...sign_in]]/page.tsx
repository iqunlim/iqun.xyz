import { Input } from "@/components/ui/input";
import { login } from "./actions";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="flex h-svh w-svw items-center justify-center">
      <form className="flex w-1/2 flex-col gap-4 p-8">
        <label htmlFor="email">Email:</label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="on"
          required
        />
        <label htmlFor="password">Password:</label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="on"
          required
        />
        <Button formAction={login}>Log in</Button>
      </form>
    </main>
  );
}
