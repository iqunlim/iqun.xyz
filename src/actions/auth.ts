"use server";
import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  LoginInformation,
  LoginSchema,
} from "@/app/(auth)/sign_in/[[...sign_in]]/types";

export async function Login(loginInformation: LoginInformation) {
  const result = LoginSchema.safeParse(loginInformation);
  if (!result.data || result.error) {
    throw new Error("There was an error with the login form. Please try again");
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(result.data);

  if (error) {
    throw new Error("Username or password was incorrect");
  }
  redirect("/admin");
}
