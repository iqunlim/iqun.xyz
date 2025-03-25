"use client";

import { Button } from "@/components/ui/button";
import { deletePostBySlug } from "@/action/data";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DeleteButton(props: any) {
  const slug = props.slug;
  const router = useRouter();

  return (
    <Button
      variant="destructive"
      onClick={() => {
        deletePostBySlug(slug);
        router.push("/admin");
      }}
    >
      Delete
    </Button>
  );
}
