"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

export default function Page() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <main className="flex h-svh w-svw items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(Login)}
          className="flex w-1/2 flex-col gap-4 p-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormDescription>Email</FormDescription>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    autoComplete="on"
                    placeholder="..."
                    required
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormDescription>Password</FormDescription>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="on"
                    placeholder="******"
                    required
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button type="submit">Log in</Button>
        </form>
      </Form>
    </main>
  );
}
