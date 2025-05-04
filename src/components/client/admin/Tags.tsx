import { Button } from "@/components/ui/button";
import { BlogTableEntry } from "@/db/schema";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

type TagsProps = {
  setValue: UseFormSetValue<BlogTableEntry>;
  watch: UseFormWatch<BlogTableEntry>;
  formStateRefresh: () => Promise<void> | undefined;
};

export default function Tags({ setValue, watch, formStateRefresh }: TagsProps) {
  const tags = watch("tags");

  const addTag = () => {
    const tag = prompt("Insert tag");
    if (tag) {
      setValue("tags", [...(tags || []), tag]);
    }
    formStateRefresh();
  };

  const delTag = (tagToDelete: string) => {
    setValue(
      "tags",
      tags.filter((tag) => tag != tagToDelete),
    );
    formStateRefresh();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {tags?.map((tag: string, i: number) => (
          <p
            className="hover:bg-accent flex cursor-pointer items-center justify-center gap-2 rounded-full border p-2"
            key={i}
            onClick={() => delTag(tag)}
          >
            {tag}
            <span className="text-red-500">x</span>
          </p>
        ))}
        <Button type="button" onClick={() => addTag()}>
          Add Tag
        </Button>
      </div>
    </div>
  );
}
