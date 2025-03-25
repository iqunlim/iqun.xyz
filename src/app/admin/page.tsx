import { databaseDateToString } from "@/lib/utils";
import { getAllBlogPosts } from "../blog/data";
import Link from "next/link";

export default async function Page() {
  const data = await getAllBlogPosts();
  if (!data) return;
  return (
    <main className="min-w-1/2 justify-self-center py-4">
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

          {data.map((post) => (
            <tr key={post.slug} className="border p-4">
              <td className="border p-2">{post.id}</td>
              <td className="border p-2">{post.slug}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
