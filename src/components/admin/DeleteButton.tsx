"use client";

import { Button } from "@/components/ui/button";
import { deletePostBySlug } from "@/action/data";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

type DeleteButtonProps = {
  slug: string;
};

export default function DeleteButton(props: DeleteButtonProps) {
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
