"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 charactrers log " }),
});

type LoginInformation = z.infer<typeof LoginSchema>;

export async function Login(loginInformation: LoginInformation) {
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
