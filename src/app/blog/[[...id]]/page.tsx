import { getPostBySlug } from "@/lib/repository/blog";
import BlogContent from "./content";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id?: string[] }>;
}) {
  const id = (await params).id?.[0];
  if (!id) redirect("/");
  const data = await getPostBySlug(id).catch((error) => console.error(error));
  if (!data?.[0]) return <h1>Not found</h1>;

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <BlogContent data={data[0]} className="w-full border-x-2 lg:w-2/3" />
    </main>
  );
}
