import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut({ scope: "local" });
  return error;
}

// TODO: better way to do this...
export default async function Page() {
  const error = await signOut();
  if (error) return <div>There was an error, please try again...</div>;
  redirect("/");
}
