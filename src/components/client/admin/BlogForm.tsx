"use client";
import {
  blogTableInsertType,
  BlogTableZod,
  blogTableZodSchema,
} from "@/db/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PutBlogPostAction } from "@/actions/blogForm";
import { UpsertDraft } from "@/actions/drafts";
import React, { useActionState, useCallback, useMemo, useRef } from "react";
import { debounce, omit } from "lodash";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function BlogForm({
  formInitialState,
  setFormStateValues,
  draftIdState,
}: {
  formInitialState?: Partial<blogTableInsertType>;
  setFormStateValues: React.Dispatch<
    React.SetStateAction<Partial<blogTableInsertType>>
  >;
  draftIdState: string;
}) {
  const [state, formAction] = useActionState(PutBlogPostAction, {
    message: "",
  });

  const form = useForm<BlogTableZod>({
    resolver: zodResolver(blogTableZodSchema),
    //defaultValues are REQUIRED or else react will throw a "controlled to
    // uncontrolled error"
    defaultValues: {
      title: formInitialState?.title || "",
      slug: formInitialState?.slug || "",
      summary: formInitialState?.summary || "",
      content: formInitialState?.content || "",
      altText: formInitialState?.altText || "",
      image: undefined,
      tags: formInitialState?.tags || [],
    },
  });

  const imageValue = form.watch("image");
  const formRef = useRef<HTMLFormElement>(null);

  const updateFn = useCallback(async () => {
    const formDataOmitted = omit(form.getValues(), "image", "tags", "altText");
    setFormStateValues((prev) => ({ ...prev, ...formDataOmitted }));
    await UpsertDraft(draftIdState, formDataOmitted);
  }, [draftIdState, form, setFormStateValues]);

  const debouncedUpdateFormState = useMemo(() => {
    return debounce(updateFn, 1000);
  }, [updateFn]);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        className="relative flex w-full flex-col gap-4"
        action={formAction}
        onSubmit={() => {
          form.handleSubmit(() => formRef.current?.submit());
          return false; // required to stop refresh
        }}
      >
        {state && <h1>{state.message}</h1>}
        <input type="hidden" {...form.register("slug")} />
        <input type="hidden" {...form.register("tags")} />
        <input type="hidden" name="draftId" value={draftIdState} readOnly />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className="bg-background-transparent"
                  placeholder="..."
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    debouncedUpdateFormState();
                  }}
                />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea
                  maxLength={500}
                  className="bg-background-transparent min-h-24"
                  placeholder="..."
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    debouncedUpdateFormState();
                  }}
                />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Content</FormLabel>
              <FormControl>
                <Textarea
                  className="bg-background-transparent min-h-[24rem]"
                  placeholder="..."
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    debouncedUpdateFormState();
                  }}
                />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />
        <input
          className="rounded-md border p-2"
          type="file"
          accept="image/png, image/jpeg"
          {...form.register("image")}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            ExtractFilePreviewUrlAndSetState(
              e.target.name as keyof blogTableInsertType,
              file,
              setFormStateValues,
            );
          }}
        />
        {/* Only display alt text field if an image is uploaded */}
        {/* TODO: bug related to state causing this to appear when updating state */}
        {imageValue && (
          <FormField
            control={form.control}
            name="altText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alt. Text (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="bg-background-transparent"
                    placeholder="..."
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      debouncedUpdateFormState();
                    }}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
        )}
        <Button className="cursor-pointer" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

function ExtractFilePreviewUrlAndSetState<T extends Record<string, unknown>>(
  fieldName: keyof T,
  file: File,
  setter: React.Dispatch<React.SetStateAction<T>>,
) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const result = event.target?.result;
    if (!result) {
      throw new TypeError(
        "Error in FilePreviewHandler, target or target result were null",
      );
    } else {
      setter((prev) => ({
        ...prev,
        [fieldName]: result.toString(),
      }));
    }
  };
  reader.readAsDataURL(file);
}
