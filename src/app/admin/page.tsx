import { databaseDateToString } from "@/lib/utils";
import { getAllBlogPosts } from "@/action/data";
import Link from "next/link";
import DeleteButton from "../../components/admin/DeleteButton";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/sign_in");
  }

  const blogData = await getAllBlogPosts().catch((error) =>
    console.error(error),
  );
  if (!blogData) return;
  return (
    <main className="align-center flex min-w-1/2 justify-center py-4">
      <table className="border-4">
        <tbody>
          <tr className="border p-4">
            <td colSpan={3} className="p-2 text-center">
              <Link
                className="text-lg font-bold text-green-500 underline hover:text-green-300"
                href="/admin/edit"
              >
                New
              </Link>
            </td>
          </tr>
          <tr className="border border-y-4 p-4">
            <th className="border p-2">ID</th>
            <th className="border p-2">Slug</th>
            <th className="border p-2">Creation Date</th>
            <th className="border p-2">Edit</th>
          </tr>

          {blogData.map((post) => (
            <tr key={post.slug} className="border p-4">
              <td className="border p-2">{post.id}</td>
              <td className="border p-2">
                <Link
                  className="border-none hover:underline"
                  href={`/blog/${post.slug}`}
                >
                  {post.slug}
                </Link>
              </td>
              <td className="border p-2">
                {databaseDateToString(post.createdAt)}
              </td>
              <td className="border p-2">
                <Link
                  className="text-green-500 underline hover:text-green-300"
                  href={`/admin/edit/${post.slug}`}
                >
                  Edit
                </Link>
              </td>
              <td>
                <DeleteButton slug={post.slug} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
