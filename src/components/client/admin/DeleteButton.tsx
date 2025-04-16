"use client";

import { Button } from "@/components/ui/button";
import { deletePostBySlug } from "@/actions/blog";
import { useRouter } from "next/navigation";
import { DeleteDraftBySlug } from "@/actions/drafts";

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
          router.refresh();
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
          DeleteDraftBySlug(slug);
          router.refresh();
        }
      }}
    >
      Delete
    </Button>
  );
}
