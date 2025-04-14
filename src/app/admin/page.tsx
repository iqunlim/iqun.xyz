import { databaseDateToString } from "@/lib/utils";
import { getAllBlogPosts } from "@/action/data";
import Link from "next/link";
import {
  DeletePostButton,
  DeleteDraftButton,
} from "../../components/admin/DeleteButton";
import { getAllDrafts } from "./edit/[[...slug]]/actions";

export default async function Page() {
  const blogData = await getAllBlogPosts().catch((error) =>
    console.error(error),
  );

  const draftData = await getAllDrafts();
  if (!blogData) return;
  return (
    <main className="flex flex-col items-center justify-center gap-4 py-4">
      <table className="min-w-1/2 border-4">
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
                <DeletePostButton slug={post.slug} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {draftData.length > 0 ? (
        <table className="min-w-1/2 border-4">
          <tbody>
            <tr className="border-b-2 text-center">
              <td>Drafts</td>
            </tr>
            {draftData.map((draft) => (
              <tr key={draft.draftId}>
                <td className="border pl-2">
                  {draft.slug || "Draft for new post"}
                </td>
                <td className="border text-center">
                  <Link
                    className="text-green-500 underline hover:text-green-300"
                    href={`/admin/edit${draft.slug ? "/" + draft.slug : ""}?draft=${draft.draftId}`}
                  >
                    Edit
                  </Link>
                </td>
                <td className="border">
                  <DeleteDraftButton slug={draft.draftId} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </main>
  );
}
