import { useActionState } from "react";
import { Button } from "../ui/button";

async function handleSubmit(prevState: any, formData: FormData) {
  console.log(formData.get("name"));
}

export default function ContactForm() {
  const [state, action, isPending] = useActionState(handleSubmit, null);

  return (
    <form className="flex w-3/4 flex-col gap-2 lg:w-1/2" action={action}>
      <input
        id="name"
        type="text"
        placeholder="Name"
        aria-label="Name"
        className="bg-accent rounded-sm p-2"
      />
      <input
        id="name"
        type="text"
        placeholder="Email"
        aria-label="Name"
        className="bg-accent rounded-sm p-2"
      />
      <textarea
        id="message"
        placeholder="Message"
        aria-label="Message"
        className="bg-accent resize-none rounded-sm p-2"
        rows={7}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
