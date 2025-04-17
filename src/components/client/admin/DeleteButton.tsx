"use client";

import { Button } from "@/components/ui/button";
import { deletePostBySlug } from "@/actions/blog";
import { useRouter } from "next/navigation";
import { DeleteDraftByDraftId } from "@/actions/drafts";

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
          DeleteDraftByDraftId(slug); // Do note, this is not a slug actually
          router.refresh();
        }
      }}
    >
      Delete
    </Button>
  );
}
