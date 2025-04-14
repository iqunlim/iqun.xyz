"use client";

import { Button } from "@/components/ui/button";
import { deletePostBySlug } from "@/action/data";
import { useRouter } from "next/navigation";
import { deleteDraftsByDraftIdAction } from "@/app/admin/edit/[[...slug]]/actions";

type DeleteButtonProps = {
  slug: string;
};

export function DeletePostButton(props: DeleteButtonProps) {
  const slug = props.slug;
  const router = useRouter();

  return (
    <Button
      variant="destructive"
      onClick={() => {
        if (confirm(`Really delete ${slug}?`)) {
          deletePostBySlug(slug);
          router.push("/admin");
        }
      }}
    >
      Delete
    </Button>
  );
}

export function DeleteDraftButton(props: DeleteButtonProps) {
  const slug = props.slug;
  const router = useRouter();

  return (
    <Button
      variant="destructive"
      onClick={() => {
        if (confirm(`Really delete ${slug}?`)) {
          deleteDraftsByDraftIdAction(slug);
          router.push("/admin");
        }
      }}
    >
      Delete
    </Button>
  );
}
