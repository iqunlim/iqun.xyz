import { Button } from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useRef } from "react";
import { useFadeIn } from "@/hooks/hooks";

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

  const onSubmit: SubmitHandler<z.infer<typeof EmailInputSchema>> = (data) =>
    console.log(data);

  return (
    <Form {...form}>
      <form
        style={style}
        ref={formRef}
        className="flex w-3/4 flex-col gap-2 lg:w-1/2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-background"
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
                  className="bg-background"
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
                  className="bg-background min-h-48"
                  placeholder="Message..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
