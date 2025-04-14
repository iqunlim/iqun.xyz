"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginSchema } from "./types";
import { z } from "zod";

export async function login(loginInformation: z.infer<typeof LoginSchema>) {
  try {
    const data = LoginSchema.parse(loginInformation);

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      console.error(error);
      redirect("/error");
    }
  } catch (e) {
    console.error(e);
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/admin");
}
