import BlogContent from "./content";
import { redirect } from "next/navigation";
import { getPostBySlug } from "../data";

export default async function Page({
  params,
}: {
  params: Promise<{ id?: string[] }>;
}) {
  const id = (await params).id?.[0];
  if (!id) redirect("/");
  const data = await getPostBySlug(id);
  if (!data[0]) return <h1>Not found</h1>;

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <BlogContent data={data[0]} />
    </main>
  );
}
