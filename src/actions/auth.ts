"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  LoginInformation,
  LoginSchema,
} from "@/app/(auth)/sign_in/[[...sign_in]]/types";

export async function Login(loginInformation: LoginInformation) {
  const data = LoginSchema.parse(loginInformation);

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw new Error("Username or password was incorrect");
  }
  redirect("/admin");
}
