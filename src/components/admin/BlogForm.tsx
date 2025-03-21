"use client";
import {
  blogTableInsertType,
  BlogTableZod,
  blogTableZodSchema,
} from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function BlogForm({
  setFormStateValues,
}: {
  setFormStateValues: React.Dispatch<
    React.SetStateAction<Partial<blogTableInsertType>>
  >;
}) {
  const form = useForm<BlogTableZod>({
    resolver: zodResolver(blogTableZodSchema),
    //defaultValues are REQUIRED or else react will throw a "controlled to
    // uncontrolled error"
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      altText: "",
      image: "",
      tags: [],
    },
  });

  const imageValue = form.watch("image");

  const onSubmit: SubmitHandler<BlogTableZod> = async (data) => {
    console.log(data);
    // Translate from BlogTableZod to BlogTableInsertType
  };

  return (
    <Form {...form}>
      <form
        className="relative flex w-full flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
                    setFormStateValues((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
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
                    setFormStateValues((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
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
                    setFormStateValues((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Header Image (optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  className="bg-background-transparent"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    // let url;
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (
                        event.target === null ||
                        event.target.result === null
                      ) {
                        throw new Error(
                          "Error in setupImageElement, target or target result were null",
                        );
                      }
                      // event.target?.result.toString();
                      console.log("Hit");
                      setFormStateValues((prev) => ({
                        ...prev,
                        [e.target.name]: event?.target?.result?.toString(),
                      }));
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />
        {/* Only display alt text field if an image is uploaded */}
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
                      setFormStateValues((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
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
