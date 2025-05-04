import { getPostBySlug } from "@/lib/repository/blog";
import BlogContent from "./content";
import { redirect } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id?.[0];
  if (id) {
    const data = await getPostBySlug(id).catch((error) => console.error(error));
    if (data?.[0]) {
      return {
        title: "iqun.xyz Blog: " + data[0].title,
        description: data[0].summary,
      };
    }
  }
  return {
    title: "IQs React Stuff",
    description: "iqun.xyz",
  };
}

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
