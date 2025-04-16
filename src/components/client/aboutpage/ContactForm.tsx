"use client";
import { Button } from "../../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { useRef } from "react";
import { useFadeIn } from "@/hooks/hooks";
import clsx from "clsx";

const EmailInputSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email().min(5),
  message: z.string().min(1).max(5000),
});

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const style = useFadeIn([formRef], "up");

  const form = useForm<z.infer<typeof EmailInputSchema>>({
    resolver: zodResolver(EmailInputSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof EmailInputSchema>> = async (
    data,
  ) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);
    await fetch("https://formspree.io/f/mnnpqkld", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        form.setError("root", {
          type: "custom",
          message:
            "Error submitting form. Please refresh the page or try again later!",
        });
        throw new Error(`Error: Form failed:  Return values: ${res.json()}`);
      }
    });
  };

  return (
    <Form {...form}>
      {form.formState.isSubmitSuccessful && (
        <p className="bg-background-transparent rounded-md border p-2 font-bold">
          Thank you! I will reply to you as soon as possible!
        </p>
      )}
      {form.formState.errors.root && (
        <p className="text-destructive bg-background-transparent rounded-md border p-2 font-bold">
          There was an error submitting the form. Please try again later.
        </p>
      )}
      <form
        style={style}
        ref={formRef}
        className="relative flex w-3/4 flex-col gap-2 lg:w-1/2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-background-transparent"
                  placeholder="Name"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-background-transparent"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="bg-background-transparent min-h-48"
                  placeholder="Message..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={clsx({
            invisible:
              form.formState.isSubmitting || form.formState.isSubmitSuccessful,
          })}
        >
          Submit
        </Button>
        {form.formState.isSubmitting && (
          <div className="absolute flex h-full w-full items-center justify-center bg-[oklch(0_0_0_/_0.5)]">
            <div className="border-tranparent h-20 w-20 animate-spin rounded-full border-4 border-t-green-500"></div>
          </div>
        )}
      </form>
    </Form>
  );
}
