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
import { Button } from "@/components/ui/button";
import { Login } from "@/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginInformation, LoginSchema } from "./types";
import { useState } from "react";

export default function Page() {
  const form = useForm<LoginInformation>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState("");

  return (
    <main className="flex h-svh w-svw items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((formValues) =>
            Login(formValues).catch((error) => setError(error.message)),
          )}
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
          {error && <h1 className="text-destructive text-xl">{error}</h1>}
          <Button type="submit">Log in</Button>
        </form>
      </Form>
    </main>
  );
}
